from backend.product.models.favourite import ProductFavourite
from rest_framework import serializers


class ProductFavouriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductFavourite
        fields = ("id", "user_id", "product_id")
