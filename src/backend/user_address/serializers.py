from backend.user_address.models import Address
from rest_framework import serializers


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = (
            "id",
            "created_at",
            "updated_at",
            "uuid",
            "title",
            "name",
            "last_name",
            "street",
            "street_number",
            "city",
            "zipcode",
            "floor",
            "location_type",
            "phone",
            "mobile_phone",
            "notes",
            "is_main",
            "user",
            "country",
            "region",
        )
