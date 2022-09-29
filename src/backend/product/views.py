from backend.product.models import Product
from backend.product.paginators import ProductsPagination
from backend.product.serializers import ProductSerializer
from django.http import Http404
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView


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
            return Product.objects.filter(category__slug=category_slug).get(
                slug=product_slug
            )
        except Product.DoesNotExist:
            raise Http404

    def get(self, request, category_slug, product_slug, format=None):
        product = self.get_object(category_slug, product_slug)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    def patch(self, request, category_slug, product_slug):
        product = self.get_object(category_slug, product_slug)
        data = {"hits": product.hits + 1}
        serializer = ProductSerializer(
            product, data=data, partial=True
        )  # set partial=True to update a data partially
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.data)
