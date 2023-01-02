from backend.user.models import UserAccount
from rest_framework import serializers


class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "phone",
            "email",
            "city",
            "zipcode",
            "address",
            "place",
            "country",
            "region",
            "is_active",
            "is_staff",
        ]
