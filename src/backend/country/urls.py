from backend.country import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path(
        "countries/",
        views.CountriesList.as_view(
            {
                "list": {
                    "operationId": "api_v1_countries_list_get",
                },
            }
        ),
    ),
    path(
        "countries/<str:alpha_2>/",
        views.CountryDetail.as_view(
            {
                "list": {
                    "operationId": "api_v1_countries_detail_get",
                },
            }
        ),
    ),
]

urlpatterns = format_suffix_patterns(urlpatterns)
