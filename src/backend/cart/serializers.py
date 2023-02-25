from backend.cart.models import Cart
from backend.cart.models import CartItem
from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers


class CartItemSerializer(serializers.ModelSerializer):
    cart = serializers.SerializerMethodField("get_cart_id")

    @extend_schema_field(serializers.IntegerField)
    def get_cart_id(self) -> int:
        cart = self.context.get("cart")
        return cart.id

    class Meta:
        model = CartItem
        fields = (
            "id",
            "cart",
            "product",
            "quantity",
            "total_price",
            "total_discount_value",
            "product_discount_percent",
        )

    def create(self, validated_data):
        cart = self.context.get("cart")
        if CartItem.objects.filter(
            cart=cart, product=validated_data["product"]
        ).exists():
            raise serializers.ValidationError("Product already in cart")
        cart_item = CartItem.objects.create(cart=cart, **validated_data)
        return cart_item


class CartSerializer(serializers.ModelSerializer):
    cart_items = serializers.SerializerMethodField("get_cart_items")

    @extend_schema_field(serializers.ListSerializer(child=CartItemSerializer()))
    def get_cart_items(self, cart: Cart) -> CartItemSerializer:
        qs = CartItem.objects.filter(cart=cart)
        serializer = CartItemSerializer(qs, many=True, context=self.context)
        return serializer.data

    class Meta:
        model = Cart
        fields = (
            "id",
            "user",
            "total_price",
            "total_discount_value",
            "total_vat_value",
            "total_items",
            "total_items_unique",
            "cart_items",
        )
