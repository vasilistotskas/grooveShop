from backend.blog.models.author import BlogAuthor
from rest_framework import serializers


class BlogAuthorSerializer(serializers.ModelSerializer):
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
