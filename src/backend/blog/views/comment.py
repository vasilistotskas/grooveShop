from __future__ import annotations

from backend.blog.models.comment import BlogComment
from backend.blog.paginators.comment import BlogCommentPagination
from backend.blog.serializers.comment import BlogCommentSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.filters import OrderingFilter
from rest_framework.filters import SearchFilter
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


class BlogCommentViewSet(ModelViewSet):
    queryset = BlogComment.objects.all()
    serializer_class = BlogCommentSerializer
    pagination_class = BlogCommentPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = ["id", "user", "post"]
    ordering_fields = ["id", "user", "post"]
    ordering = ["id"]
    search_fields = ["id", "user", "post"]

    def create(self, request, *args, **kwargs) -> Response | ValidationError:
        serializer = BlogCommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        raise ValidationError(serializer.errors)

    def retrieve(self, request, pk=None, *args, **kwargs) -> Response:
        comment = get_object_or_404(BlogComment, pk=pk)
        serializer = BlogCommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None, *args, **kwargs) -> Response | ValidationError:
        comment = get_object_or_404(BlogComment, pk=pk)
        serializer = BlogCommentSerializer(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        raise ValidationError(serializer.errors)

    def partial_update(
        self, request, pk=None, *args, **kwargs
    ) -> Response | ValidationError:
        comment = get_object_or_404(BlogComment, pk=pk)
        serializer = BlogCommentSerializer(comment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        raise ValidationError(serializer.errors)

    def destroy(self, request, pk=None, *args, **kwargs) -> Response:
        comment = get_object_or_404(BlogComment, pk=pk)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
