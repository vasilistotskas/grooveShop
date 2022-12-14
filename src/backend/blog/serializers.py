from backend.blog.models import Category
from backend.blog.models import Post
from rest_framework import serializers


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = (
            "id",
            "title",
            "subtitle",
            "slug",
            "body",
            "meta_description",
            "image",
            "likes",
            "category",
            "tags",
            "author",
            "created_at",
            "updated_at",
            "published_at",
            "is_published",
            "uuid",
            "main_image_absolute_url",
            "main_image_filename",
            "number_of_likes",
            "number_of_comments",
            "get_post_tags_count",
        )


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            "id",
            "name",
            "slug",
            "image",
            "created_at",
            "updated_at",
            "sort_order",
            "uuid",
            "main_image_absolute_url",
            "main_image_filename",
        )
