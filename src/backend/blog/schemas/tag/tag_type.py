import strawberry
import strawberry_django
from backend.blog.models import Tag


@strawberry_django.type(Tag)
class TagType:
    id: strawberry.ID
    name: str
    active: str
