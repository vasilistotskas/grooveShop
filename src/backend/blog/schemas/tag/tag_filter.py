import strawberry_django
from backend.blog import models
from strawberry import auto


@strawberry_django.filters.filter(models.Author)
class AuthorByIdFilter:
    id: auto
