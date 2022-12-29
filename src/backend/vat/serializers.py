from backend.vat.models import Vat
from rest_framework import serializers


class VatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vat
        fields = "__all__"
