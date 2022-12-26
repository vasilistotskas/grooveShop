from backend.product_review import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
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
