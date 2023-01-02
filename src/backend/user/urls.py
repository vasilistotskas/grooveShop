from backend.user.views.account import UserAccountViewSet
from backend.user.views.address import UserAddressViewSet
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path(
        "user/account/",
        UserAccountViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "user/account/<int:pk>/",
        UserAccountViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    # Address
    path(
        "user/address/",
        UserAddressViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "user/address/<int:pk>/",
        UserAddressViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
]

urlpatterns = format_suffix_patterns(urlpatterns)
