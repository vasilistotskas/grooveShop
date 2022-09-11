from typing import List
import strawberry.django
from backend.blog.schemas.author.author_type import AuthorType


@strawberry.type
class Query:
    allAuthors: List[AuthorType] = strawberry.django.field()
    authorById: AuthorType = strawberry.django.field()
