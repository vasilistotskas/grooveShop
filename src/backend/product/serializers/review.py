from backend.product.models.review import ProductReview
from backend.product.serializers.product import ProductSerializer
from backend.user.models import UserProfile
from backend.user.serializers.profile import UserProfileSerializer
from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers


class ProductReviewSerializer(serializers.ModelSerializer):
    userprofile = serializers.SerializerMethodField("get_userprofile")
    product = ProductSerializer(required=False)

    @extend_schema_field(UserProfileSerializer())
    def get_userprofile(self, review):
        qs = UserProfile.objects.get(user=review.user)
        serializer = UserProfileSerializer(instance=qs)
        return serializer.data

    class Meta:
        model = ProductReview
        fields = (
            "id",
            "product",
            "product_id",
            "user_id",
            "comment",
            "rate",
            "status",
            "created_at",
            "updated_at",
            "userprofile",
        )
