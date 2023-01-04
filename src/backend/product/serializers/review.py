from backend.product.models.review import ProductReview
from rest_framework import serializers


class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReview
        fields = (
            "id",
            "product",
            "user",
            "comment",
            "rate",
            "status",
            "created_at",
            "updated_at",
        )
