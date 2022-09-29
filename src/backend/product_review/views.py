from backend.product_review.models import Review
from backend.product_review.paginators import ProductReviewPagination
from backend.product_review.paginators import UserReviewPagination
from backend.product_review.serializers import ReviewSerializer
from rest_framework import authentication
from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class ProductReviews(generics.ListCreateAPIView):
    pagination_class = ProductReviewPagination
    serializer_class = ReviewSerializer

    def get_queryset(self):
        # exclude current user review
        user = self.request.user
        product_id = self.kwargs["product_id"]
        if not user.is_anonymous:
            return Review.objects.filter(product_id=product_id).exclude(user=user)

        return Review.objects.filter(product_id=product_id)

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.filter_queryset(self.get_queryset())

            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)

            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        except Review.DoesNotExist:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)

    # one review per customer at product, he can either edit or delete review
    # if delete he can make new one
    def post(self, request, *args, **kwargs):
        product_id = self.kwargs["product_id"]
        user_id = request.data.get("user_id")
        serializer = self.get_serializer(data=request.data)

        # Check user has already add a review for this product
        try:
            review = Review.objects.get(user_id=user_id, product_id=product_id)
            if review:
                return Response(
                    "You have already add a review for current product",
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Review.DoesNotExist:
            pass

        if serializer.is_valid():
            serializer.save(user_id=user_id, product_id=product_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserReviews(generics.ListAPIView):
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = UserReviewPagination
    serializer_class = ReviewSerializer

    def get_queryset(self):
        user = self.request.user
        return Review.objects.filter(user=user)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class UserToProductReview(APIView):
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id, product_id, format=None):
        try:
            review = Review.objects.get(user_id=user_id, product_id=product_id)
            serializer = ReviewSerializer(review)
            return Response(serializer.data)
        except Review.DoesNotExist:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)

    # Another (better) way to delete
    def delete(self, request, user_id, product_id, format=None):
        try:
            review = Review.objects.get(user_id=user_id, product_id=product_id)
            self.perform_destroy(review)
        except Review.DoesNotExist:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)

    def patch(self, request, user_id, product_id):
        try:
            review = Review.objects.get(user_id=user_id, product_id=product_id)
        except Review.DoesNotExist:
            return Response(status=status.HTTP_204_NO_CONTENT)

        data = request.data
        serializer = ReviewSerializer(
            review, data=data, partial=True
        )  # set partial=True to update a data partially

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.data)

    @staticmethod
    def perform_destroy(instance):
        instance.delete()
