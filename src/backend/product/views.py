from .serializers import *
from django.http import Http404
from rest_framework import filters
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from backend.helpers.paginator import CountPaginator
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import status, authentication, permissions


class ProductsPagination(CountPaginator):
    page_size = 16


class CategoryProductsPagination(CountPaginator):
    page_size = 36
    page_size_query_param = 'page_size'
    max_page_size = 36
    page_query_param = 'p'


class UserFavouriteProductsPagination(CountPaginator):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 8
    page_query_param = 'p'


class UserReviewPagination(CountPaginator):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 3
    page_query_param = 'p'


class ProductReviewPagination(CountPaginator):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 2
    page_query_param = 'p'


class LatestProductsList(APIView):

    def get(self, format=None):
        products = Product.objects.all()[0:5]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class ProductsAllResults(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = ProductsPagination

    # @method_decorator(cache_page(60*30))
    def list(self, request, *args, **kwargs):

        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ProductDetail(APIView):
    @staticmethod
    def get_object(category_slug, product_slug):
        try:
            return Product.objects.filter(category__slug=category_slug).get(slug=product_slug)
        except Product.DoesNotExist:
            raise Http404

    def get(self, request, category_slug, product_slug, format=None):
        product = self.get_object(category_slug, product_slug)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    def patch(self, request, category_slug, product_slug):
        product = self.get_object(category_slug, product_slug)
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


class CategoryProductsList(generics.ListAPIView):
    pagination_class = CategoryProductsPagination
    serializer_class = ProductSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['id', 'hits', 'name', 'discount_percent', 'price']
    ordering = ['id']

    def get_queryset(self,  *args, **kwargs):
        category_slug = self.kwargs['category_slug']
        category = Category.objects.get(slug=category_slug)
        qs = Product.objects.filter(category__in=category.get_descendants(include_self=True))
        return qs

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class CategoryTreeView(GenericAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.all()

    # @method_decorator(cache_page(60*30))
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


class FavouriteUserListIds(APIView):
    authentication_classes = [authentication.SessionAuthentication]
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


class FavouriteUserProductList(generics.ListAPIView):
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = UserFavouriteProductsPagination
    serializer_class = FavouriteProductSerializer

    def get_queryset(self):
        user = self.request.user
        return Favourite.objects.filter(user=user)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class FavouriteDelete(APIView):
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    # One way to delete
    def delete(self, request, user_id, product_id, format=None):
        favourite = Favourite.objects.get(user_id=user_id, product_id=product_id)
        favourite.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProductReviews(generics.ListCreateAPIView):
    pagination_class = ProductReviewPagination
    serializer_class = ReviewSerializer

    def get_queryset(self):
        # exclude current user review
        user = self.request.user
        product_id = self.kwargs['product_id']
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

    # one review per customer at product, he can either edit or delete review , if delete he can make new one
    def post(self, request, *args, **kwargs):
        product_id = self.kwargs['product_id']
        user_id = request.data.get('user_id')
        serializer = self.get_serializer(data=request.data)

        # Check user has already add a review for this product
        try:
            review = Review.objects.get(user_id=user_id, product_id=product_id)
            if review:
                return Response('You have already add a review for current product', status=status.HTTP_400_BAD_REQUEST)
        except:
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
        serializer = ReviewSerializer(review, data=data, partial=True) # set partial=True to update a data partially

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.data)

    @staticmethod
    def perform_destroy(instance):
        instance.delete()
