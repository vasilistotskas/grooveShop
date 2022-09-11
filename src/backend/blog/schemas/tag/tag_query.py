import strawberry.django
from typing import List
from backend.blog.schemas.tag.tag_type import TagType


@strawberry.type
class Query:
    all_tags: List[TagType] = strawberry.django.field()

