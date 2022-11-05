from typing import List

import strawberry.django
import strawberry_django
from backend.tip.models import Tip
from strawberry import auto


@strawberry_django.type(Tip)
class TipType:
    id: strawberry.ID
    title: str
    content: str
    kind: str
    icon: auto
    url: str
    created_at: auto
    active: bool
    main_image_absolute_url: str
    main_image_filename: str


@strawberry.type
class Query:
    allTips: List[TipType] = strawberry_django.field()
