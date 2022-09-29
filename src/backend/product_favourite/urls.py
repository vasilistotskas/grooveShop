from typing import Any
from typing import List

from backend.product_favourite import views
from django.urls import path
from django.urls import URLPattern
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns: List[URLPattern | URLPattern | Any] = [
    path("favourites/<int:user_id>/", views.FavouriteUserListIds.as_view()),
    path(
        "favourites/delete/<int:user_id>/<int:product_id>/",
        views.FavouriteDelete.as_view(),
    ),
    path(
        "favourites/products/<int:user_id>/", views.FavouriteUserProductList.as_view()
    ),
]

urlpatterns = format_suffix_patterns(urlpatterns)