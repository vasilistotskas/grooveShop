from backend.blog.views.author import BlogAuthorViewSet
from backend.blog.views.category import BlogCategoryViewSet
from backend.blog.views.comment import BlogCommentViewSet
from backend.blog.views.post import BlogPostViewSet
from backend.blog.views.tag import BlogTagViewSet
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path("blog/posts/", BlogPostViewSet.as_view({"get": "list", "post": "create"})),
    path(
        "blog/posts/<int:pk>/",
        BlogPostViewSet.as_view(
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
        BlogPostViewSet.as_view({"post": "update_likes"}),
    ),
    path(
        "blog/categories/",
        BlogCategoryViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "blog/categories/<int:pk>/",
        BlogCategoryViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    path("blog/authors/", BlogAuthorViewSet.as_view({"get": "list", "post": "create"})),
    path(
        "blog/authors/<int:pk>/",
        BlogAuthorViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    path(
        "blog/comments/", BlogCommentViewSet.as_view({"get": "list", "post": "create"})
    ),
    path(
        "blog/comments/<int:pk>/",
        BlogCommentViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    path("blog/tags/", BlogTagViewSet.as_view({"get": "list", "post": "create"})),
    path(
        "blog/tags/<int:pk>/",
        BlogTagViewSet.as_view(
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
