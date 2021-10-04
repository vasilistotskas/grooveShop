from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from user import views

urlpatterns = [
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),

    path('userprofile/', views.UserProfileList.as_view()),
    path('userprofile/<int:pk>/', views.UserProfileDetail.as_view()),
    path('userprofile/auth/', views.UserProfileDetailAuth.as_view()),

    path('countries/', views.CountriesList.as_view()),
    path('countries/<alpha_2>/', views.CountryDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)