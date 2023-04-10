from backend.order.models import Order
from backend.order.models import OrderItem
from backend.product.serializers.product import ProductSerializer
from rest_framework import serializers


class OrderItemSerializer(serializers.ModelSerializer):
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


class OrderSerializer(serializers.ModelSerializer):
    order_item_order = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = (
            "id",
            "user",
            "pay_way",
            "status",
            "first_name",
            "last_name",
            "email",
            "address",
            "zipcode",
            "place",
            "city",
            "phone",
            "customer_notes",
            "order_item_order",
            "created_at",
            "updated_at",
            "uuid",
            "total_price",
        )

    def create(self, validated_data):
        items_data = validated_data.pop("order_item_order")
        order = Order.objects.create(**validated_data)

        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)

        return order
