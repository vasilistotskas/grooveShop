from __future__ import annotations

from backend.blog.models.category import BlogCategory
from backend.blog.paginators.category import BlogCategoryPagination
from backend.blog.serializers.category import BlogCategorySerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.filters import OrderingFilter
from rest_framework.filters import SearchFilter
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


class BlogCategoryViewSet(ModelViewSet):
    queryset = BlogCategory.objects.all()
    serializer_class = BlogCategorySerializer
    pagination_class = BlogCategoryPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = ["id", "name"]
    ordering_fields = ["id", "name"]
    ordering = ["id"]
    search_fields = ["id", "name"]

    def create(self, request, *args, **kwargs) -> Response | ValidationError:
        serializer = BlogCategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        raise ValidationError(serializer.errors)

    def retrieve(self, request, pk=None, *args, **kwargs) -> Response:
        category = get_object_or_404(BlogCategory, pk=pk)
        serializer = BlogCategorySerializer(category)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None, *args, **kwargs) -> Response | ValidationError:
        category = get_object_or_404(BlogCategory, pk=pk)
        serializer = BlogCategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return ValidationError(serializer.errors)

    def partial_update(
        self, request, pk=None, *args, **kwargs
    ) -> Response | ValidationError:
        category = get_object_or_404(BlogCategory, pk=pk)
        serializer = BlogCategorySerializer(category, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return ValidationError(serializer.errors)

    def destroy(self, request, pk=None, *args, **kwargs) -> Response:
        category = get_object_or_404(BlogCategory, pk=pk)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
