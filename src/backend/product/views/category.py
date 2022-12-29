from __future__ import annotations

from backend.product.models.category import ProductCategory
from backend.product.models.product import Product
from backend.product.paginators.category import ProductCategoryPagination
from backend.product.serializers.category import ProductCategorySerializer
from backend.product.serializers.product import ProductSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.filters import OrderingFilter
from rest_framework.filters import SearchFilter
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


class ProductCategoryViewSet(ModelViewSet):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer
    pagination_class = ProductCategoryPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = ["id", "name", "tags"]
    ordering_fields = [
        "id",
        "name",
        "-created_at",
    ]
    ordering = ["id"]
    search_fields = [
        "id",
        "name",
        "tags",
    ]

    def list(self, request, *args, **kwargs) -> Response:
        root_nodes = self.get_queryset().get_cached_trees()
        data = []
        for n in root_nodes:
            data.append(self.recursive_node_to_dict(n))
        return Response(data)

    def create(self, request, *args, **kwargs) -> Response | ValidationError:
        serializer = ProductCategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None, *args, **kwargs) -> Response:
        category = get_object_or_404(ProductCategory, id=pk)
        serializer = ProductCategorySerializer(category)
        return Response(serializer.data)

    def update(self, request, pk=None, *args, **kwargs) -> Response | ValidationError:
        category = get_object_or_404(ProductCategory, id=pk)
        serializer = ProductCategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(
        self, request, pk=None, *args, **kwargs
    ) -> Response | ValidationError:
        category = get_object_or_404(ProductCategory, id=pk)
        serializer = ProductCategorySerializer(
            category, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None, *args, **kwargs) -> Response:
        category = get_object_or_404(ProductCategory, id=pk)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=["get"])
    def category_products(self, request, pk=None, *args, **kwargs) -> Response:
        category = get_object_or_404(ProductCategory, id=pk)
        products = Product.objects.filter(
            category__in=category.get_descendants(include_self=True)
        )
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def recursive_node_to_dict(self, node):
        result = self.get_serializer(instance=node).data
        children = [self.recursive_node_to_dict(c) for c in node.get_children()]
        if children:
            result["children"] = children
        return result
