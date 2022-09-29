from typing import Any
from typing import List

from backend.product_category import views
from django.urls import path
from django.urls import URLPattern
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns: List[URLPattern | URLPattern | Any] = [
    path("categories/categoriesTree/", views.CategoryTreeView.as_view()),
    path("categories/categoriesUnorganized/", views.CategoriesUnorganized.as_view()),
    path("categories/<slug:category_slug>/", views.CategoryDetail.as_view()),
    path(
        "category_products/<slug:category_slug>/", views.CategoryProductsList.as_view()
    ),
]

urlpatterns = format_suffix_patterns(urlpatterns)
