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
            "city",
            "zipcode",
            "address",
            "place",
            "country",
            "region",
            "is_active",
            "is_staff",
            "main_image_absolute_url",
            "main_image_filename",
        ]
