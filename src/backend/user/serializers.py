from backend.helpers.image_resize import make_thumbnail
from backend.user.models import UserProfile
from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers

User = get_user_model()


class UserCreationSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ("id", "email", "first_name", "last_name", "password")


class UserProfileSerializer(serializers.ModelSerializer):
    email: str = serializers.EmailField(required=True)

    class Meta:
        model = UserProfile
        fields = [
            "id",
            "user",
            "email",
            "country",
            "first_name",
            "last_name",
            "phone",
            "email",
            "city",
            "zipcode",
            "address",
            "place",
            "region",
            "main_image_absolute_url",
            "main_image_filename",
            "get_user_profile_image_url",
        ]

    def update(self, instance, validated_data):
        # * User Profile Info
        instance.address = validated_data.get("address", instance.address)
        instance.email = validated_data.get("email", instance.email)
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.phone = validated_data.get("phone", instance.phone)
        instance.place = validated_data.get("place", instance.place)
        instance.city = validated_data.get("city", instance.city)
        instance.zipcode = validated_data.get("zipcode", instance.zipcode)

        # check if user change image then resize it
        uploaded_image = validated_data.get("image")
        if uploaded_image:
            size = (100, 100)
            image = make_thumbnail(uploaded_image, size)
            instance.image = image

        country = validated_data.get("country")
        instance.country = country
        if not instance.country:
            instance.country = None

        region = validated_data.get("region")
        instance.region = region
        if not instance.region:
            instance.region = None

        instance.save()

        return instance


class UserSerializer(serializers.ModelSerializer):
    # create user profile
    userprofile = UserProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ["id", "email", "userprofile"]
