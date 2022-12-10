from backend.product_category import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path("categories/categoriesTree/", views.CategoryTreeView.as_view()),
    path("categories/<slug:category_slug>/", views.CategoryDetail.as_view()),
    path(
        "category_products/<slug:category_slug>/", views.CategoryProductsList.as_view()
    ),
]

urlpatterns = format_suffix_patterns(urlpatterns)
