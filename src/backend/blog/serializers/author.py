from typing import Dict
from typing import Type

from backend.blog.models.author import BlogAuthor
from backend.core.api.serializers import BaseExpandSerializer
from backend.user.models import UserAccount
from backend.user.serializers.account import UserAccountSerializer
from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField


class BlogAuthorSerializer(BaseExpandSerializer):
    user = PrimaryKeyRelatedField(queryset=UserAccount.objects.all())

    class Meta:
        model = BlogAuthor
        fields = (
            "id",
            "user",
            "website",
            "bio",
            "created_at",
            "updated_at",
            "uuid",
        )

    def get_expand_fields(self) -> Dict[str, Type[serializers.ModelSerializer]]:
        return {
            "user": UserAccountSerializer,
        }
