from backend.tip.models import Tip
from rest_framework import serializers


class TipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tip
        fields = "__all__"
