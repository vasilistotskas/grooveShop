from typing import Any
from typing import List

from backend.product import views
from django.urls import path
from django.urls import URLPattern
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns: List[URLPattern | URLPattern | Any] = [
    path("latest-products/", views.LatestProductsList.as_view()),
    path("products/all/", views.ProductsAllResults.as_view()),
    path(
        "products/<slug:category_slug>/<slug:product_slug>/",
        views.ProductDetail.as_view(),
    ),
]

urlpatterns = format_suffix_patterns(urlpatterns)
