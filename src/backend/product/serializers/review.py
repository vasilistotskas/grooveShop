from typing import Dict
from typing import Type

from backend.core.api.serializers import BaseExpandSerializer
from backend.product.models.product import Product
from backend.product.models.review import ProductReview
from backend.product.serializers.product import ProductSerializer
from backend.user.models import UserAccount
from backend.user.serializers.account import UserAccountSerializer
from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField


class ProductReviewSerializer(BaseExpandSerializer):
    product = PrimaryKeyRelatedField(queryset=Product.objects.all())
    user = PrimaryKeyRelatedField(queryset=UserAccount.objects.all())

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
            "published_at",
            "is_published",
            "uuid",
        )

    def get_expand_fields(self) -> Dict[str, Type[serializers.ModelSerializer]]:
        return {
            "product": ProductSerializer,
            "user": UserAccountSerializer,
        }
