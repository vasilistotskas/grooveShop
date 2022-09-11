import strawberry.django
from typing import List
from backend.blog.schemas.category.category_type import CategoryType


@strawberry.type
class Query:
    allCategories: List[CategoryType] = strawberry.django.field()
