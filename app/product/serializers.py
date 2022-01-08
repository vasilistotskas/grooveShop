from user.models import UserProfile
from rest_framework import serializers
from user.serializers import UserProfileSerializer
from .models import Category, Product, ProductImages, Favourite, Review


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
            "slug",
            "category",
            "absolute_url",
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
            "review_average",
            "review_counter",
            "images"
        )


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            "id",
            "name",
            "slug",
            "description",
            "description",
            "menu_image_one",
            "menu_image_two",
            "menu_main_banner",
            "parent",
            "tags",
            "level",
            "tree_id",
            "absolute_url",
            "recursive_product_count"
        )


class FavouriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Favourite
        fields = (
            "id",
            "user_id",
            "product_id"
        )


class FavouriteProductSerializer(serializers.ModelSerializer):

    product_object = serializers.SerializerMethodField('get_product_object')

    def get_product_object(self, favourite):
        qs = Product.objects.get(id=favourite.product_id)
        serializer = ProductSerializer(instance=qs)
        return serializer.data

    class Meta:
        model = Product
        fields = ("product_object",)


class ReviewSerializer(serializers.ModelSerializer):
    userprofile = serializers.SerializerMethodField('get_userprofile')
    product = ProductSerializer(required=False)

    def get_userprofile(self, review):
        qs = UserProfile.objects.get(user=review.user)
        serializer = UserProfileSerializer(instance=qs)
        return serializer.data

    class Meta:
        model = Review
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
            "userprofile"
        )
