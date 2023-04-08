from backend.order.models import Order
from backend.order.models import OrderItem
from backend.product.serializers.product import ProductSerializer
from rest_framework import serializers


class UserOrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = OrderItem
        fields = (
            "id",
            "price",
            "product",
            "quantity",
            "created_at",
            "updated_at",
            "uuid",
            "sort_order",
            "total_price",
        )


class UserOrderSerializer(serializers.ModelSerializer):
    order_item_order = UserOrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = (
            "id",
            "user",
            "first_name",
            "last_name",
            "email",
            "address",
            "zipcode",
            "place",
            "city",
            "phone",
            "stripe_token",
            "customer_notes",
            "order_item_order",
            "paid_amount",
            "created_at",
            "updated_at",
            "uuid",
            "total_price",
        )


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = (
            "id",
            "price",
            "product",
            "quantity",
            "created_at",
            "updated_at",
            "uuid",
            "sort_order",
            "total_price",
        )


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = (
            "id",
            "user",
            "pay_way",
            "first_name",
            "last_name",
            "email",
            "address",
            "zipcode",
            "place",
            "city",
            "phone",
            "customer_notes",
            "stripe_token",
            "items",
            "created_at",
            "updated_at",
            "uuid",
            "total_price",
        )

    def create(self, validated_data):
        items_data = validated_data.pop("items")
        order = Order.objects.create(**validated_data)

        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)

        return order
