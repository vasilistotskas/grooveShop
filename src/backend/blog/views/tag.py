from __future__ import annotations

from backend.blog.models.tag import BlogTag
from backend.blog.paginators.tag import BlogTagPagination
from backend.blog.serializers.tag import BlogTagSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.filters import OrderingFilter
from rest_framework.filters import SearchFilter
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


class BlogTagViewSet(ModelViewSet):
    queryset = BlogTag.objects.all()
    serializer_class = BlogTagSerializer
    pagination_class = BlogTagPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = ["id", "name", "active"]
    ordering_fields = ["id", "name", "active"]
    ordering = ["id"]
    search_fields = ["name"]

    def create(self, request, *args, **kwargs) -> Response | ValidationError:
        serializer = BlogTagSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        raise ValidationError(serializer.errors)

    def retrieve(self, request, pk=None, *args, **kwargs) -> Response:
        tag = get_object_or_404(BlogTag, pk=pk)
        serializer = BlogTagSerializer(tag)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None, *args, **kwargs) -> Response | ValidationError:
        tag = get_object_or_404(BlogTag, pk=pk)
        serializer = BlogTagSerializer(tag, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        raise ValidationError(serializer.errors)

    def partial_update(
        self, request, pk=None, *args, **kwargs
    ) -> Response | ValidationError:
        tag = get_object_or_404(BlogTag, pk=pk)
        serializer = BlogTagSerializer(tag, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        raise ValidationError(serializer.errors)
