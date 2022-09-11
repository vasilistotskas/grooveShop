import strawberry.django
from strawberry import auto

from backend.blog.models import Tag


@strawberry.django.type(Tag)
class TagType:
    id: auto
    name: str
    active: str
