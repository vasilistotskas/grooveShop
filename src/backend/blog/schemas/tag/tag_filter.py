import strawberry
from backend.blog import models
from strawberry_django_plus import gql


@strawberry.django.filters.filter(models.Author)
class AuthorByIdFilter:
    id: gql.ID
