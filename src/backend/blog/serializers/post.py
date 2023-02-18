from typing import Dict
from typing import Type

from backend.blog.models.author import BlogAuthor
from backend.blog.models.category import BlogCategory
from backend.blog.models.post import BlogPost
from backend.blog.models.tag import BlogTag
from backend.blog.serializers.author import BlogAuthorSerializer
from backend.blog.serializers.category import BlogCategorySerializer
from backend.blog.serializers.tag import BlogTagSerializer
from backend.core.api.serializers import BaseExpandSerializer
from backend.user.models import UserAccount
from backend.user.serializers.account import UserAccountSerializer
from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField


class BlogPostSerializer(BaseExpandSerializer):
    likes = PrimaryKeyRelatedField(queryset=UserAccount.objects.all(), many=True)
    category = PrimaryKeyRelatedField(queryset=BlogCategory.objects.all())
    tags = PrimaryKeyRelatedField(queryset=BlogTag.objects.all(), many=True)
    author = PrimaryKeyRelatedField(queryset=BlogAuthor.objects.all())

    class Meta:
        model = BlogPost
        fields = (
            "id",
            "title",
            "subtitle",
            "slug",
            "body",
            "meta_description",
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

    def get_expand_fields(self) -> Dict[str, Type[serializers.ModelSerializer]]:
        return {
            "likes": UserAccountSerializer,
            "category": BlogCategorySerializer,
            "tags": BlogTagSerializer,
            "author": BlogAuthorSerializer,
        }
