from typing import List

import strawberry.django
import strawberry_django
from backend.blog.schemas.tag.tag_type import TagType


@strawberry.type
class Query:
    all_tags: List[TagType] = strawberry_django.field()
