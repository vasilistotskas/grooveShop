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
    country = CountrySerializer()
    country_alpha = serializers.CharField(source='country.alpha_2')

    def get_favourite_id(self, request):
        return request.user.favourite.id

    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'country', 'country_alpha', 'favourite_id', 'first_name', 'last_name', 'phone', 'email', 'city', 'zipcode', 'address',
                  'place', 'region', 'image']

    def update(self, instance, validated_data):
        # * User Profile Info
        instance.address = validated_data.get(
            'address', instance.address)
        instance.email = validated_data.get(
            'email', instance.email)
        instance.first_name = validated_data.get(
            'first_name', instance.first_name)
        instance.last_name = validated_data.get(
            'last_name', instance.last_name)
        instance.phone = validated_data.get(
            'phone', instance.phone)
        instance.place = validated_data.get(
            'place', instance.place)
        instance.city = validated_data.get(
            'city', instance.city)
        instance.region = validated_data.get(
            'region', instance.region)
        instance.zipcode = validated_data.get(
            'zipcode', instance.zipcode)
        instance.image = validated_data.get(
            'image', instance.image)

        country = validated_data.get('country')
        if country:
            instance.country.alpha_2 = country.get('alpha_2')
            updated_country = Country.objects.get(alpha_2=instance.country.alpha_2)
            instance.country = updated_country

        instance.save()

        return instance


class UserSerializer(serializers.ModelSerializer):
    # create user profile
    userprofile = UserProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'userprofile']
