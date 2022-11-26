from backend.country import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path("countries/", views.CountriesList.as_view()),
    path("countries/<alpha_2>/", views.CountryDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
