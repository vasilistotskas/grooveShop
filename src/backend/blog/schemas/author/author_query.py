from typing import List
from strawberry_django_plus import gql
from backend.blog.schemas.author.author_type import AuthorType
from backend.blog.schemas.author.author_filter import AuthorByEmailFilter


@gql.type
class Query:
    allAuthors: List[AuthorType] = gql.django.field()
    authorByEmail: AuthorType = gql.django.field(filters=AuthorByEmailFilter)
