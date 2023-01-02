from backend.product.models.review import ProductReview
from backend.product.serializers.product import ProductSerializer
from backend.user.models import UserAccount
from backend.user.serializers.account import UserAccountSerializer
from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers


class ProductReviewSerializer(serializers.ModelSerializer):
    user_account = serializers.SerializerMethodField("get_user_account")
    product = ProductSerializer(required=False)

    @extend_schema_field(UserAccountSerializer())
    def get_user_account(self, review):
        qs = UserAccount.objects.get(user=review.user)
        serializer = UserAccountSerializer(instance=qs)
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
            "user_account",
        )
