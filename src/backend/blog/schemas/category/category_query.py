from typing import List

import strawberry.django
import strawberry_django
from backend.blog.schemas.category.category_type import CategoryType


@strawberry.type
class Query:
    categories: List[CategoryType] = strawberry_django.field()
