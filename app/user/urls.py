from user import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [

    # Auth
    path('login/', views.login_view, name='api-login'),
    path('logout/', views.logout_view, name='api-logout'),
    path('session/', views.session_view, name='api-session'),
    path('accounts/activate/<uid>/<token>', views.ActivateUser.as_view({'get': 'activation'}), name='activation'),

    path('userprofile/<int:pk>/', views.UserProfileDetail.as_view()),
    path('userprofile/data/', views.UserProfileData.as_view()),

    path('countries/', views.CountriesList.as_view()),
    path('countries/<alpha_2>/', views.CountryDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)