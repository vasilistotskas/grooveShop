import os
import strawberry
from typing import List
import strawberry_django
from strawberry import auto
from django.conf import settings
from backend.tip.models import Tip
from strawberry_django_plus import gql


@gql.django.type(Tip)
class TipType:
    id: strawberry.ID
    title: str
    content: str
    kind: str
    icon: auto
    url: str
    created_at: auto
    active: bool

    @gql.django.field
    def main_image_absolute_url(self) -> str:
        try:
            if self.id is not None:
                icon = settings.BACKEND_BASE_URL + self.icon.url
            else:
                icon = ""
            return icon
        except:
            return ""

    @gql.django.field
    def main_image_filename(self) -> str:
        try:
            return os.path.basename(self.icon.name)
        except:
            return ""


@gql.type
class Query:
    allTips: List[TipType] = gql.django.field()

