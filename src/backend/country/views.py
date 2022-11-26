from backend.country.models import Country
from backend.country.serializers import CountrySerializer
from backend.region.models import Region
from backend.region.serializers import RegionSerializer
from rest_framework import generics


class CountriesList(generics.ListAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer


class CountryDetail(generics.ListAPIView):
    serializer_class = RegionSerializer

    def get_queryset(self):
        alpha_2 = self.kwargs["alpha_2"]
        return Region.objects.filter(alpha_2=alpha_2)
