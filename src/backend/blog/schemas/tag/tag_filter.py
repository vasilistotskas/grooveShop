import strawberry.django
from strawberry import auto
from backend.blog import models


@strawberry.django.filters.filter(models.Author)
class AuthorByIdFilter:
    id: auto
