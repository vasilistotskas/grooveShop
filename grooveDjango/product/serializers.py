from rest_framework import serializers
from .models import Category, Product, ProductImages, Favourite, Review
from user.models import UserProfile
from user.serializers import UserProfileSerializer


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
            "review_avarage",
            "review_counter",
            "images"
        )


class CategorySerializer(serializers.ModelSerializer):
    # products = ProductSerializer(many=True)
    all_tree_products = serializers.SerializerMethodField('get_all_products_of_tree')

    def get_all_products_of_tree(self, category):
        # if category.get_children():
        qs = Product.objects.filter(category__in=category.get_descendants(include_self=True))
        serializer = ProductSerializer(instance=qs, many=True)
        return serializer.data

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
            "level",
            "tree_id",
            "absolute_url",
            # "products",
            "recursive_product_count",
            "all_tree_products"
        )


class FavouriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Favourite
        fields = (
            "id",
            "user_id",
            "product_id"
        )


class ReviewSerializer(serializers.ModelSerializer):
    userprofile = serializers.SerializerMethodField('get_userprofile')

    def get_userprofile(self, review):
        qs = UserProfile.objects.get(user=review.user)
        serializer = UserProfileSerializer(instance=qs)
        return serializer.data

    class Meta:
        model = Review
        fields = (
            "id",
            "product_id",
            "user_id",
            "comment",
            "rate",
            "status",
            "created_at",
            "updated_at",
            "userprofile"
        )
