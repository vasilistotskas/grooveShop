from backend.slider.views import SliderViewSet
from backend.slider.views import SlideViewSet
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path(
        "slider/",
        SliderViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "slider/<str:pk>/",
        SliderViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    path(
        "slide/",
        SlideViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "slide/<str:pk>/",
        SlideViewSet.as_view(
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
