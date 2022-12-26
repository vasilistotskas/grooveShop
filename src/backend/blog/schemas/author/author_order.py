import strawberry_django
from backend.blog.models.author import BlogAuthor
from strawberry import auto


@strawberry_django.ordering.order(BlogAuthor)
class AuthorOrder:
    name: auto
