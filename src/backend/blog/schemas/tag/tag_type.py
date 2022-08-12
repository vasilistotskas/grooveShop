from backend.blog.models import Tag
from strawberry_django_plus import gql


@gql.django.type(Tag)
class TagType:
    id: gql.ID
    name: str
    active: str
