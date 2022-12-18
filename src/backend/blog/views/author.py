from __future__ import annotations

from backend.blog.models.author import BlogAuthor
from backend.blog.paginators.author import BlogAuthorPagination
from backend.blog.serializers.author import BlogAuthorSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.filters import OrderingFilter
from rest_framework.filters import SearchFilter
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


class BlogAuthorViewSet(ModelViewSet):
    queryset = BlogAuthor.objects.all()
    serializer_class = BlogAuthorSerializer
    pagination_class = BlogAuthorPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = ["id", "user"]
    ordering_fields = ["id", "user"]
    ordering = ["id"]
    search_fields = ["id", "user"]

    def create(self, request, *args, **kwargs) -> Response | ValidationError:
        serializer = BlogAuthorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        raise ValidationError(serializer.errors)

    def retrieve(self, request, pk=None, *args, **kwargs) -> Response:
        author = get_object_or_404(BlogAuthor, pk=pk)
        serializer = BlogAuthorSerializer(author)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None, *args, **kwargs) -> Response | ValidationError:
        author = get_object_or_404(BlogAuthor, pk=pk)
        serializer = BlogAuthorSerializer(author, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        raise ValidationError(serializer.errors)

    def partial_update(
        self, request, pk=None, *args, **kwargs
    ) -> Response | ValidationError:
        author = get_object_or_404(BlogAuthor, pk=pk)
        serializer = BlogAuthorSerializer(author, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        raise ValidationError(serializer.errors)

    def destroy(self, request, pk=None, *args, **kwargs) -> Response:
        author = get_object_or_404(BlogAuthor, pk=pk)
        author.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
