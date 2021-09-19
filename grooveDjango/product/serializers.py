from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Category, Product, Favourite, FavouriteItem


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "get_absolute_url",
            "description",
            "price",
            "get_image",
            "get_thumbnail"
        )


class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)

    class Meta:
        model = Category
        fields = (
            "id",
            "name",
            "description",
            "description",
            "image_url",
            "parent",
            "tags",
            "get_absolute_url",
            "products"
        )


class FavouriteItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = FavouriteItem
        fields = (
            "favourite",
            "product",
            "is_favourite"
        )


class FavouriteSerializer(serializers.ModelSerializer):
    favourite_items = FavouriteItemSerializer(many=True)

    class Meta:
        model = Favourite
        fields = (
            "id",
            "user",
            "favourite_items"
        )
