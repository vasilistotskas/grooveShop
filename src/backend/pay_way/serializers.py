from backend.pay_way.models import PayWay
from rest_framework import serializers


class PayWaySerializer(serializers.ModelSerializer):
    class Meta:
        model = PayWay
        fields = (
            "name",
            "active",
            "cost",
            "free_for_order_amount",
            "created_at",
            "updated_at",
            "sort_order",
            "uuid",
        )
