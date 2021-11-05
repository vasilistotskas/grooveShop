from django.db.models import Q
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, authentication, permissions, generics, viewsets
from .serializers import *
from rest_framework.generics import GenericAPIView


class LatestProductsList(APIView):
    @staticmethod
    def get(request, format=None):
        products = Product.objects.all()[0:4]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class ProductDetail(APIView):
    @staticmethod
    def get_object(product_slug):
        try:
            return Product.objects.filter(slug=product_slug).get()
        except Product.DoesNotExist:
            raise Http404

    def get(self, request, product_slug, format=None):
        product = self.get_object(product_slug)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    def patch(self, request, product_slug):
        product = self.get_object(product_slug)
        data = {
            "hits": product.hits + 1
        }
        serializer = ProductSerializer(product, data=data, partial=True) # set partial=True to update a data partially
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.data)


class CategoryDetail(GenericAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self):
        category_slug = self.kwargs['category_slug']
        return Category.objects.get(slug=category_slug)

    def get(self, request, *args, **kwargs):
        root_nodes = self.get_queryset()
        data = [self.recursive_node_to_dict(root_nodes)]

        return Response(data)

    def recursive_node_to_dict(self, node):
        result = self.get_serializer(instance=node).data
        children = [self.recursive_node_to_dict(c) for c in node.get_children()]
        if children:
            result["children"] = children
        return result


class CategoryTreeView(GenericAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.all()

    def get(self, request, *args, **kwargs):
        root_nodes = self.get_queryset().get_cached_trees()
        data = []
        for n in root_nodes:
            data.append(self.recursive_node_to_dict(n))

        return Response(data)

    def recursive_node_to_dict(self, node):
        result = self.get_serializer(instance=node).data
        children = [self.recursive_node_to_dict(c) for c in node.get_children()]
        if children:
            result["children"] = children
        return result


class CategoriesUnorganized(APIView):
    @staticmethod
    def get(request, format=None):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)


class Search(APIView):
    def post(self, request, format=None):
        query = request.data.get('query', '')

        if query:
            products = Product.objects.filter(Q(name__icontains=query) | Q(description__icontains=query))
            serializer = ProductSerializer(products, many=True, context={'user': self.request.user})
            return Response(serializer.data)
        else:
            return Response({"products": []}, status=status.HTTP_404_NOT_FOUND)


class FavouriteList(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    @staticmethod
    def filter_objects(user_id):
        try:
            return Favourite.objects.filter(user_id=user_id)
        except Favourite.DoesNotExist:
            raise Http404

    def get(self, request, user_id, format=None):
        favourites = self.filter_objects(user_id)
        serializer = FavouriteSerializer(favourites, many=True)
        return Response(serializer.data)

    def post(self, request, user_id, format=None):
        product_id = request.data.get('product_id')
        serializer = FavouriteSerializer(data=request.data)

        # Check if product is already favourite
        try:
            favourite = Favourite.objects.get(user_id=user_id, product_id=product_id)
            if favourite:
                return Response('Product Already In Favourites', status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            pass

        if serializer.is_valid():
            serializer.save(user_id=user_id, product_id=product_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FavouriteDelete(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    # One way to delete
    def delete(self, request, user_id, product_id, format=None):
        favourite = Favourite.objects.get(user_id=user_id, product_id=product_id)
        favourite.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProductReviews(APIView):
    @staticmethod
    def filter_objects(product_id):
        try:
            return Review.objects.filter(product_id=product_id)
        except Review.DoesNotExist:
            raise Http404

    def get(self, request, product_id, format=None):
        reviews = self.filter_objects(product_id)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    # one review per customer at product, he can either edit or delete review , if delete he can make new one
    def post(self, request, product_id, format=None):
        user_id = request.data.get('user_id')
        serializer = ReviewSerializer(data=request.data)

        # Check user has already add a review for this product
        try:
            review = Review.objects.get(user_id=user_id, product_id=product_id)
            if review:
                return Response('You have already add a review for current product', status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            pass

        if serializer.is_valid():
            serializer.save(user_id=user_id, product_id=product_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserReviews(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    @staticmethod
    def filter_objects(user_id):
        try:
            return Review.objects.filter(user_id=user_id)
        except Review.DoesNotExist:
            raise Http404

    def get(self, request, user_id, format=None):
        reviews = self.filter_objects(user_id)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)


class UserToProductReview(APIView):
    # authentication_classes = [authentication.TokenAuthentication]
    # permission_classes = [permissions.IsAuthenticated]

    @staticmethod
    def get_object(user_id, product_id):
        try:
            return Review.objects.get(user_id=user_id, product_id=product_id)
        except Review.DoesNotExist:
            raise Http404

    def get(self, request, user_id, product_id, format=None):
        review = self.get_object(user_id, product_id)
        serializer = ReviewSerializer(review)
        return Response(serializer.data)

    # Another (better) way to delete
    def delete(self, request, user_id, product_id, format=None):
        try:
            review = self.get_object(user_id, product_id)
            self.perform_destroy(review)
        except Http404:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)

    def patch(self, request, user_id, product_id):
        review = self.get_object(user_id, product_id)
        data = request.data
        serializer = ReviewSerializer(review, data=data, partial=True) # set partial=True to update a data partially
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.data)

    @staticmethod
    def perform_destroy(instance):
        instance.delete()
