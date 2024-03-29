from backend.cart.views import CartItemViewSet
from backend.cart.views import CartViewSet
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path(
        "cart/",
        CartViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    path(
        "cart/item/",
        CartItemViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "cart/item/<int:pk>",
        CartItemViewSet.as_view(
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
