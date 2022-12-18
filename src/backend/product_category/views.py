from backend.product.models import Product
from backend.product.serializers import ProductSerializer
from backend.product_category.models import Category
from backend.product_category.paginators import CategoryProductsPagination
from backend.product_category.serializers import ProductCategorySerializer
from rest_framework import filters
from rest_framework import generics
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response


class CategoryDetail(GenericAPIView):
    serializer_class = ProductCategorySerializer

    def get_queryset(self):
        category_slug = self.kwargs["category_slug"]
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
    ordering_fields = ["id", "hits", "name", "discount_percent", "price"]
    ordering = ["id"]

    def get_queryset(self, *args, **kwargs):
        category_slug = self.kwargs["category_slug"]
        category = Category.objects.get(slug=category_slug)
        qs = Product.objects.filter(
            category__in=category.get_descendants(include_self=True)
        )
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
    serializer_class = ProductCategorySerializer

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
