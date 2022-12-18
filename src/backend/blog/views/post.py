from __future__ import annotations

from backend.blog.models.post import BlogPost
from backend.blog.paginators.post import BlogPostPagination
from backend.blog.serializers.post import BlogPostSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.filters import OrderingFilter
from rest_framework.filters import SearchFilter
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


class BlogPostViewSet(ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    pagination_class = BlogPostPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = ["id", "tags", "slug", "author"]
    ordering_fields = [
        "id",
        "title",
        "slug",
        "created_at",
        "updated_at",
        "published_at",
    ]
    ordering = ["-created_at"]
    search_fields = ["id", "title", "subtitle", "body"]

    def create(self, request, *args, **kwargs) -> Response | ValidationError:
        serializer = BlogPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        raise ValidationError(serializer.errors)

    def retrieve(self, request, pk=None, *args, **kwargs) -> Response:
        post = get_object_or_404(BlogPost, pk=pk)
        serializer = BlogPostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None, *args, **kwargs) -> Response | ValidationError:
        post = get_object_or_404(BlogPost, pk=pk)
        serializer = BlogPostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return ValidationError(serializer.errors)

    def partial_update(
        self, request, pk=None, *args, **kwargs
    ) -> Response | ValidationError:
        post = get_object_or_404(BlogPost, pk=pk)
        serializer = BlogPostSerializer(post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return ValidationError(serializer.errors)

    def destroy(self, request, pk=None, *args, **kwargs):
        post = get_object_or_404(BlogPost, pk=pk)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(
        detail=True,
        methods=["post"],
        permission_classes=[IsAuthenticated],
        authentication_classes=[SessionAuthentication],
    )
    def update_likes(self, request, pk=None) -> Response:
        if not request.user.is_authenticated:
            return Response({"detail": "Forbidden."}, status=status.HTTP_403_FORBIDDEN)

        post = get_object_or_404(BlogPost, pk=pk)
        user = request.user

        if post.likes.contains(user):
            post.likes.remove(user)
        else:
            post.likes.add(user)
        post.save()
        serializer = self.get_serializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)
