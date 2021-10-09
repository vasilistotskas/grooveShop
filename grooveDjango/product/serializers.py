from rest_framework import serializers
from .models import Category, Product, ProductImages, Favourite, FavouriteItem


class ImagesSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductImages
        fields = (
            "id",
            "image",
            "is_main"
        )


class ProductHitsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = (
            "id",
            "hits"
        )


class ProductSerializer(serializers.ModelSerializer):
    images = ImagesSerializer(source='productimages_set', many=True, read_only=True)

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "category",
            "get_absolute_url",
            "description",
            "price",
            "vat",
            "vat_percent",
            "vat_value",
            "final_price",
            "hits",
            "likes_counter",
            "stock",
            "active",
            "discount_percent",
            "discount_value",
            "date_added",
            "main_image",
            "images"
        )


class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)

    class Meta:
        model = Category
        fields = (
            "id",
            "name",
            "slug",
            "description",
            "description",
            "image_url",
            "parent",
            "tags",
            "get_absolute_url",
            "products"
        )


class FavouriteItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = FavouriteItem
        fields = (
            "favourite_id",
            "is_favourite",
            "product"
        )

    def create(self, validated_data):
        product_data = validated_data.pop('product')
        is_favourite_data = validated_data.pop('is_favourite')
        user = self.context.get('request').user
        favourite_id = Favourite.objects.get(user=user).id

        return FavouriteItem.objects.create(favourite_id=favourite_id, product_id=product_data.id, is_favourite=is_favourite_data)


class FavouriteSerializer(serializers.ModelSerializer):
    favourite_items = FavouriteItemSerializer(many=True)

    class Meta:
        model = Favourite
        fields = (
            "id",
            "user",
            "favourite_items"
        )
