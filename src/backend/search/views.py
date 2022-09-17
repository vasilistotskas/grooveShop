from backend.product.models import Product
from backend.product.serializers import ProductSerializer
from backend.search.paginators import *
from django.db.models import Q
from rest_framework import generics
from rest_framework import status


class SearchProduct(generics.ListAPIView):
    serializer_class = ProductSerializer
    pagination_class = SearchPagination

    def get_queryset(self):
        queryset = Product.objects.all()
        query = self.request.query_params.get("query")

        if query is not None:
            queryset = queryset.filter(
                Q(name__contains=query)
                | Q(description__contains=query)
                | Q(id__contains=query)
            )
        return queryset
