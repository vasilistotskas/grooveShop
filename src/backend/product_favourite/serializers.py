from backend.product.models import Product
from backend.product.serializers import ProductSerializer
from backend.product_favourite.models import Favourite
from rest_framework import serializers


class FavouriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favourite
        fields = ("id", "user_id", "product_id")


class FavouriteProductSerializer(serializers.ModelSerializer):

    product_object = serializers.SerializerMethodField("get_product_object")

    def get_product_object(self, favourite):
        qs = Product.objects.get(id=favourite.product_id)
        serializer = ProductSerializer(instance=qs)
        return serializer.data

    class Meta:
        model = Product
        fields = ("product_object",)
