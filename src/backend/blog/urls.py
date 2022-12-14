from backend.blog import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path("blog/posts/", views.PostViewSet.as_view({"get": "list", "post": "create"})),
    path(
        "blog/posts/<int:pk>/",
        views.PostViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    path(
        "blog/posts/<int:pk>/update_likes/",
        views.PostViewSet.as_view({"post": "update_likes"}),
    ),
    path("blog/categories/", views.CategoryViewSet.as_view({"get": "list"})),
]

urlpatterns = format_suffix_patterns(urlpatterns)
