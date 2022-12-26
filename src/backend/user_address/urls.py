from backend.user_address import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path("address/", views.UserAddressList.as_view()),
    path(
        "address/<int:pk>/",
        views.UserAddressDetail.as_view(),
    ),
]

urlpatterns = format_suffix_patterns(urlpatterns)
