from backend.country.models import Country
from backend.region.serializers import RegionSerializer
from rest_framework import serializers


class CountrySerializer(serializers.ModelSerializer):
    regions = RegionSerializer(source="region_set", required=False, many=True)

    class Meta:
        model = Country
        fields = ["name", "alpha_2", "alpha_3", "iso_cc", "phone_code", "regions"]
