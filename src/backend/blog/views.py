from backend.blog.models import Category
from backend.blog.models import Post
from backend.blog.paginators import CategoryPagination
from backend.blog.paginators import PostPagination
from backend.blog.serializers import CategorySerializer
from backend.blog.serializers import PostSerializer
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import action
from rest_framework.filters import OrderingFilter
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pagination_class = PostPagination
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
    search_fields = ["title", "subtitle", "body", "id"]

    # This method creates a new post in the database
    def create(self, request, *args, **kwargs):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # This method retrieves a specific post based on its id
    def retrieve(self, request, pk=None, *args, **kwargs):
        post = get_object_or_404(Post, pk=pk)
        serializer = PostSerializer(post)
        return Response(serializer.data)

    # This method updates an existing post in the database
    def update(self, request, pk=None, *args, **kwargs):
        post = get_object_or_404(Post, pk=pk)
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # This method patches an existing post in the database
    def partial_update(self, request, pk=None, *args, **kwargs):
        post = get_object_or_404(Post, pk=pk)
        serializer = PostSerializer(post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # This method deletes an existing post in the database
    def destroy(self, request, pk=None, *args, **kwargs):
        post = get_object_or_404(Post, pk=pk)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(
        detail=True,
        methods=["post"],
        permission_classes=[IsAuthenticated],
        authentication_classes=[SessionAuthentication],
    )
    def update_likes(self, request, pk=None):
        if not request.user.is_authenticated:
            return Response({"detail": "Forbidden."}, status=status.HTTP_403_FORBIDDEN)

        post = get_object_or_404(Post, pk=pk)
        user = request.user

        if post.likes.contains(user):
            post.likes.remove(user)
        else:
            post.likes.add(user)
        post.save()
        serializer = self.get_serializer(post)
        return Response(serializer.data)


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = CategoryPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = ["id", "name"]
    ordering_fields = ["id", "name"]
    ordering = ["id"]
    search_fields = ["name"]
