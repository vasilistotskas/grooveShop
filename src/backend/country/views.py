from backend.country.models import Country
from backend.country.serializers import CountrySerializer
from backend.region.models import Region
from backend.region.serializers import RegionSerializer
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet


class CountriesList(ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

    @action(methods=["get"], detail=False, operationId="api_v1_countries_list_get")
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class CountryDetail(ModelViewSet):
    serializer_class = RegionSerializer

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return Region.objects.none()
        alpha_2 = self.kwargs["alpha_2"]
        return Region.objects.filter(alpha_2=alpha_2)

    @action(methods=["get"], detail=True, operationId="api_v1_countries_detail_get")
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
