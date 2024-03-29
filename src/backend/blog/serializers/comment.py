from typing import Dict
from typing import Type

from backend.blog.models.comment import BlogComment
from backend.blog.models.post import BlogPost
from backend.blog.serializers.post import BlogPostSerializer
from backend.core.api.serializers import BaseExpandSerializer
from backend.user.models import UserAccount
from backend.user.serializers.account import UserAccountSerializer
from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField


class BlogCommentSerializer(BaseExpandSerializer):
    user = PrimaryKeyRelatedField(queryset=UserAccount.objects.all())
    post = PrimaryKeyRelatedField(queryset=BlogPost.objects.all())
    likes = PrimaryKeyRelatedField(queryset=UserAccount.objects.all(), many=True)

    class Meta:
        model = BlogComment
        fields = (
            "id",
            "content",
            "is_approved",
            "likes",
            "user",
            "post",
            "created_at",
            "updated_at",
            "uuid",
            "number_of_likes",
        )

    def get_expand_fields(self) -> Dict[str, Type[serializers.ModelSerializer]]:
        return {
            "user": UserAccountSerializer,
            "post": BlogPostSerializer,
            "likes": UserAccountSerializer,
        }
