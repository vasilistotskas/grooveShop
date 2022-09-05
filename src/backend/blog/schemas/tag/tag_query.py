from typing import List
from strawberry_django_plus import gql
from backend.blog.schemas.tag.tag_type import TagType


@gql.type
class Query:
    all_tags: List[TagType] = gql.django.field()

