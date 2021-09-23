from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Category, Product, Favourite, FavouriteItem


class ProductSerializer(serializers.ModelSerializer):

    # Create a custom method field
    is_favourite_for_current_user = serializers.SerializerMethodField('get_if_current_users_favourite')

    def get_if_current_users_favourite(self, product):
        if FavouriteItem.objects.filter(product_id=product.id).count() == 0:
            return False
        return True


    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "is_favourite_for_current_user",
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
    product = ProductSerializer(many=False)

    class Meta:
        model = FavouriteItem
        fields = (
            'id',
            "favourite_id",
            "is_favourite",
            "product"
        )

    def create(self, validated_data):

        product_data = validated_data.pop('product')
        user = self.context.get('request').user
        favourite_id = Favourite.objects.get(user=user).id

        if product_data:
            product = Product.objects.get_or_create(**product_data)[0]
            validated_data['product'] = product


        return FavouriteItem.objects.create(favourite_id=favourite_id, **validated_data)


class FavouriteSerializer(serializers.ModelSerializer):
    favourite_items = FavouriteItemSerializer(many=True)

    class Meta:
        model = Favourite
        fields = (
            "id",
            "user",
            "favourite_items"
        )
