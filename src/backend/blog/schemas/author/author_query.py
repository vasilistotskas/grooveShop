from typing import List

import strawberry.django
import strawberry_django
from backend.blog.schemas.author.author_type import AuthorType


@strawberry.type
class Query:
    authors: List[AuthorType] = strawberry_django.field()
    authorById: AuthorType = strawberry_django.field()
