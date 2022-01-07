import abc
from elasticsearch_dsl import Q
from django.http import HttpResponse
from rest_framework.views import APIView
from product.documents import ProductDocument
from product.serializers import ProductSerializer
from rest_framework.pagination import LimitOffsetPagination


class PaginatedElasticSearchAPIView(APIView, LimitOffsetPagination):
    serializer_class = None
    document_class = None

    @abc.abstractmethod
    def generate_q_expression(self, query):
        """This method should be overridden
        and return a Q() expression."""

    def get(self, request, query):
        try:
            q = self.generate_q_expression(query)
            search = self.document_class.search().query(q)
            response = search.execute()

            print(f'Found {response.hits.total.value} hit(s) for query: "{query}"')

            results = self.paginate_queryset(response, request, view=self)
            serializer = self.serializer_class(results, many=True)
            return self.get_paginated_response(serializer.data)
        except Exception as e:
            return HttpResponse(e, status=500)


class SearchProducts(PaginatedElasticSearchAPIView):
    serializer_class = ProductSerializer
    document_class = ProductDocument

    def generate_q_expression(self, query):
        return Q(
            'multi_match', query=query,
            fields=[
                'id',
                'name',
            ], fuzziness='auto')
