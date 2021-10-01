from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, Country, Region
from django.contrib.auth.models import User


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = '__all__'


class CountrySerializer(serializers.ModelSerializer):
    regions = RegionSerializer(source='region_set', required=False, many=True)

    class Meta:
        model = Country
        fields = ['name', 'alpha_2', 'alpha_3', 'iso_cc', 'phone_code', 'regions']


class UserProfileSerializer(serializers.ModelSerializer):
    favourite_id = serializers.SerializerMethodField('get_favourite_id')
    country = CountrySerializer(many=False)

    def get_favourite_id(self, request):
        return request.user.favourite.id

    class Meta:
        model = UserProfile
        fields = ['favourite_id', 'first_name', 'last_name', 'phone', 'email', 'city', 'zipcode', 'address',
                  'place', 'country', 'region', 'image']


class UserSerializer(serializers.ModelSerializer):
    # create user profile
    userprofile = UserProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'userprofile']
