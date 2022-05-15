from django.db.models import Q
from backend.search.paginators import *
from .filters import SearchProductFilter
from backend.product.models import Product
from rest_framework import status, generics
from rest_framework.response import Response
from backend.product.serializers import ProductSerializer
from django_filters.rest_framework import DjangoFilterBackend


class SearchProduct(generics.ListAPIView):
    serializer_class = ProductSerializer
    pagination_class = SearchPagination

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """

        queryset = Product.objects.all()
        query = self.request.query_params.get('query')

        if query is not None:
            queryset = queryset.filter(
                Q(name__contains=query) |
                Q(description__contains=query) |
                Q(id__contains=query)
            )
        return queryset
