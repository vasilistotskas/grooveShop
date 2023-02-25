from typing import Dict
from typing import Type

from backend.core.api.serializers import BaseExpandSerializer
from backend.product.models.favourite import ProductFavourite
from backend.product.models.product import Product
from backend.product.serializers.product import ProductSerializer
from backend.user.models import UserAccount
from backend.user.serializers.account import UserAccountSerializer
from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField


class ProductFavouriteSerializer(BaseExpandSerializer):
    user = PrimaryKeyRelatedField(queryset=UserAccount.objects.all(), many=False)
    product = PrimaryKeyRelatedField(queryset=Product.objects.all(), many=False)

    class Meta:
        model = ProductFavourite
        fields = ("id", "user", "product", "created_at", "updated_at", "uuid")

    def get_expand_fields(self) -> Dict[str, Type[serializers.ModelSerializer]]:
        return {
            "user": UserAccountSerializer,
            "product": ProductSerializer,
        }
