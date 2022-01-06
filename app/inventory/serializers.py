from inventory.models import (
    Brand,
    Category,
    Media,
    Product,
    ProductAttributeValue,
    ProductInventory,
    ProductType,
    ProductAttribute,
    Stock,
    ProductTypeAttribute,
    ProductAttributeValues
)
from rest_framework import serializers


class ProductAttributeValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAttributeValue
        fields = "__all__"
        depth = 2
        exclude = ["id"]


class ProductAttributeValuesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAttributeValues
        fields = "__all__"


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAttribute
        fields = "__all__"


class ProductAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = "__all__"


class ProductTypeAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductTypeAttribute
        fields = "__all__"


class ProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductType
        fields = "__all__"


class MediaSerializer(serializers.ModelSerializer):
    img_url = serializers.SerializerMethodField()

    class Meta:
        model = Media
        fields = "__all__"
        read_only = True
        editable = False

    def get_img_url(self, obj):
        return self.context["request"].build_absolute_uri(obj.img_url.url)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class ProductInventorySerializer(serializers.ModelSerializer):
    product = ProductSerializer(many=False, read_only=True)

    class Meta:
        model = ProductInventory
        fields = "__all__"
        read_only = True


class AllProductSerializer(serializers.HyperlinkedModelSerializer):
    category = serializers.StringRelatedField(many=True)
    product = serializers.StringRelatedField(many=True)

    class Meta:
        model = Product
        fields = "__all__"
        read_only = True
        editable = False


class SingleProductSerializer(serializers.HyperlinkedModelSerializer):
    web_id = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = ProductInventory
        fields = "__all__"
