import os
from typing import List
import strawberry.django
from strawberry import auto
from django.conf import settings
from backend.tip.models import Tip


@strawberry.django.type(Tip)
class TipType:
    id: auto
    title: str
    content: str
    kind: str
    icon: auto
    url: str
    created_at: auto
    active: bool

    @strawberry.django.field
    def main_image_absolute_url(self) -> str:
        try:
            if self.id is not None:
                icon = settings.BACKEND_BASE_URL + self.icon.url
            else:
                icon = ""
            return icon
        except:
            return ""

    @strawberry.django.field
    def main_image_filename(self) -> str:
        try:
            return os.path.basename(self.icon.name)
        except:
            return ""


@strawberry.type
class Query:
    allTips: List[TipType] = strawberry.django.field()

