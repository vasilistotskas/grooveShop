from backend.blog.models.comment import BlogComment
from rest_framework import serializers


class BlogCommentSerializer(serializers.ModelSerializer):
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
