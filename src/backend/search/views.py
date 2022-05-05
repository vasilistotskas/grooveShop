from django.db.models import Q
from backend.search.paginators import *
from backend.product.models import Product
from rest_framework import status, generics
from rest_framework.response import Response
from backend.product.serializers import ProductSerializer


class Search(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = SearchPagination

    def post(self, request, *args, **kwargs):
        query = request.data.get('query', '')
        if query:
            products = Product.objects.filter(
                Q(name__icontains=query) |
                Q(description__icontains=query) |
                Q(id__icontains=query)
            )
            queryset = self.filter_queryset(products)

            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)

            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response({"products": []}, status=status.HTTP_404_NOT_FOUND)
