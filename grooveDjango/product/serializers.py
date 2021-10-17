from rest_framework import serializers
from .models import Category, Product, ProductImages, Favourite, Comment


class ImagesSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductImages
        fields = (
            "id",
            "image",
            "is_main"
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
            "comment_avarege",
            "comment_counter",
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


class FavouriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Favourite
        fields = (
            "id",
            "user_id",
            "product_id"
        )


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = (
            "id",
            "product_id",
            "user_id",
            "subject",
            "comment",
            "rate",
            "status",
            "created_at",
            "updated_at"
        )