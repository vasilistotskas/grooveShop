from django.db.models import Q
from product.models import Product
from rest_framework import status, generics
from rest_framework.response import Response
from product.serializers import ProductSerializer
from rest_framework.pagination import PageNumberPagination


class SearchPagination(PageNumberPagination):
    page_size = 2


class Search(generics.ListAPIView):
    pagination_class = SearchPagination

    print('opa')
    def post(self, request, format=None):
        query = request.data.get('query', '')

        if query:
            products = Product.objects.filter(
                Q(name__icontains=query) |
                Q(description__icontains=query) |
                Q(id__icontains=query)
            )
            serializer = ProductSerializer(products, many=True, context={'user': self.request.user})
            return Response(serializer.data)
        else:
            return Response({"products": []}, status=status.HTTP_404_NOT_FOUND)
