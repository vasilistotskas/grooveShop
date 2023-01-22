from backend.product.models.product import Product
from backend.product.models.product import ProductImages
from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers


class ProductImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = (
            "id",
            "is_main",
            "product_image_absolute_url",
            "product_image_filename",
        )


class ProductSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField("get_product_images")

    @extend_schema_field(serializers.ListSerializer(child=ProductImagesSerializer()))
    def get_product_images(self, product: Product) -> ProductImagesSerializer:
        qs = ProductImages.objects.filter(product=product)
        serializer = ProductImagesSerializer(qs, many=True)
        return serializer.data

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
            "weight",
            "seo_title",
            "seo_description",
            "uuid",
            "discount_percent",
            "discount_value",
            "price_save_percent",
            "created_at",
            "updated_at",
            "main_image_absolute_url",
            "main_image_filename",
            "review_average",
            "review_counter",
            "images",
        )
