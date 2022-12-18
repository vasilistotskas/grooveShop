import strawberry
import strawberry_django
from backend.blog.models.tag import BlogTag


@strawberry_django.type(BlogTag)
class TagType:
    id: strawberry.ID
    name: str
    active: str
