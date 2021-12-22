from user import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [

    path('accounts/activate/<uid>/<token>', views.ActivateUser.as_view({'get': 'activation'}), name='activation'),

    path('userprofile/<int:pk>/', views.UserProfileDetail.as_view()),
    path('userprofile/data/', views.UserProfileData.as_view()),

    path('countries/', views.CountriesList.as_view()),
    path('countries/<alpha_2>/', views.CountryDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)