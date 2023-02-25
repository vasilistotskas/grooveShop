from typing import Dict
from typing import Type

from backend.core.api.serializers import BaseExpandSerializer
from backend.country.models import Country
from backend.country.serializers import CountrySerializer
from backend.region.models import Region
from backend.region.serializers import RegionSerializer
from backend.user.models import UserAccount
from backend.user.models import UserAddress
from backend.user.serializers.account import UserAccountSerializer
from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField


class UserAddressSerializer(BaseExpandSerializer):
    user = PrimaryKeyRelatedField(queryset=UserAccount.objects.all())
    country = PrimaryKeyRelatedField(queryset=Country.objects.all())
    region = PrimaryKeyRelatedField(queryset=Region.objects.all())

    class Meta:
        model = UserAddress
        fields = (
            "id",
            "created_at",
            "updated_at",
            "uuid",
            "title",
            "first_name",
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

    def get_expand_fields(self) -> Dict[str, Type[serializers.ModelSerializer]]:
        return {
            "user": UserAccountSerializer,
            "country": CountrySerializer,
            "region": RegionSerializer,
        }
