from rest_framework import serializers
from .models import Order, OrderItem, PayWay
from backend.product.serializers import ProductSerializer


class UserOrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = OrderItem
        fields = (
            "price",
            "product",
            "quantity",
        )


class UserOrderSerializer(serializers.ModelSerializer):
    items = UserOrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = (
            "id",
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
            "items",
            "paid_amount"
        )


class OrderItemSerializer(serializers.ModelSerializer):    
    class Meta:
        model = OrderItem
        fields = (
            "price",
            "product",
            "quantity",
        )


class PayWaySerializer(serializers.ModelSerializer):
    class Meta:
        model = PayWay
        fields = (
            "name",
            "active",
            "cost",
            "free_for_order_amount"
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
            "items"
        )
    
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)

        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
            
        return order

