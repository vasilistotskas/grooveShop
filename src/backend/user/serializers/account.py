from backend.user.models import UserAccount
from backend.user.serializers.profile import UserProfileSerializer
from rest_framework import serializers


class UserAccountSerializer(serializers.ModelSerializer):
    userprofile = UserProfileSerializer(required=False)

    class Meta:
        model = UserAccount
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "is_active",
            "is_staff",
            "userprofile",
        ]
