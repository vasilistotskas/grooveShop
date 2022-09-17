import strawberry_django
from backend.blog.models import Author
from strawberry import auto


@strawberry_django.ordering.order(Author)
class AuthorOrder:
    name: auto
