from typing import Any
from typing import List

from backend.product_review import views
from django.urls import path
from django.urls import URLPattern
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns: List[URLPattern | URLPattern | Any] = [
    # all Reviews of current product , get and post
    path("reviews/product/<int:product_id>/", views.ProductReviews.as_view()),
    # all Reviews of current user , get
    path("reviews/user/<int:user_id>/", views.UserReviews.as_view()),
    # specific Reviews based on user and product , delete and update
    path(
        "reviews/review/<int:user_id>/<int:product_id>/",
        views.UserToProductReview.as_view(),
    ),
]

urlpatterns = format_suffix_patterns(urlpatterns)
