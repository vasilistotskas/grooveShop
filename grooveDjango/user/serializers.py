from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile
from django.contrib.auth.models import User


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'first_name', 'last_name', 'address', 'zipcode', 'place', 'phone', 'image']


class UserSerializer(serializers.ModelSerializer):
    # create user profile
    userprofile = UserProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'userprofile']

