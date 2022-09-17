import os
from typing import List

import strawberry.django
import strawberry_django
from backend.tip.models import Tip
from django.conf import settings
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

    @strawberry_django.field
    def main_image_absolute_url(self) -> str:
        if self.icon:
            icon = settings.BACKEND_BASE_URL + self.icon.url
        else:
            icon = ""
        return icon

    @strawberry_django.field
    def main_image_filename(self) -> str:
        if self.icon:
            return os.path.basename(self.icon.name)
        else:
            return ""


@strawberry.type
class Query:
    allTips: List[TipType] = strawberry_django.field()
