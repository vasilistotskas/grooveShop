from backend.product.models import Product
from backend.product.serializers import ProductSerializer
from backend.product_favourite.models import Favourite
from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers


class FavouriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favourite
        fields = ("id", "user_id", "product_id")


class FavouriteProductSerializer(serializers.ModelSerializer):

    product_object = serializers.SerializerMethodField("get_product_object")

    @extend_schema_field(ProductSerializer())
    def get_product_object(self, favourite) -> Product:
        qs = Product.objects.get(id=favourite.product_id)
        serializer = ProductSerializer(instance=qs)
        return serializer.data

    class Meta:
        model = Product
        fields = ("product_object",)
