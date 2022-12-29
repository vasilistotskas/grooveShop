from backend.product.views.category import ProductCategoryViewSet
from backend.product.views.favourite import ProductFavouriteViewSet
from backend.product.views.product import ProductViewSet
from backend.product.views.review import ProductReviewViewSet
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    # Product
    path(
        "product/",
        ProductViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "product/<int:pk>/",
        ProductViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    path(
        "product/<int:pk>/update_product_hits/",
        ProductViewSet.as_view({"post": "update_product_hits"}),
    ),
    path(
        "product/<str:category_slug>/<str:product_slug>/",
        ProductViewSet.as_view({"get": "category_product"}),
    ),
    # Category
    path(
        "product/category/",
        ProductCategoryViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "product/category/<int:pk>/",
        ProductCategoryViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    path(
        "product/category/<int:pk>/category_products/",
        ProductCategoryViewSet.as_view({"get": "category_products"}),
    ),
    # Favourite
    path(
        "product/favourite/",
        ProductFavouriteViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "product/favourite/<str:pk>/",
        ProductFavouriteViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    # Review
    path(
        "product/review/",
        ProductReviewViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "product/review/<int:pk>/",
        ProductReviewViewSet.as_view(
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
