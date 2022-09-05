from typing import List
from strawberry_django_plus import gql
from backend.blog.schemas.author.author_type import AuthorType


@gql.type
class Query:
    allAuthors: List[AuthorType] = gql.django.field()
    authorById: AuthorType = gql.django.field()
