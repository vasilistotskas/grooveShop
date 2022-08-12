from typing import List
from strawberry_django_plus import gql
from backend.blog.schemas.category.category_type import CategoryType


@gql.type
class Query:
    allCategories: List[CategoryType] = gql.django.field()
