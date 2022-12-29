from backend.blog.models.post import BlogPost
from rest_framework import serializers


class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
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
            "status",
            "featured",
            "view_count",
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
