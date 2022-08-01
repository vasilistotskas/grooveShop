from strawberry_django_plus import gql

from backend.blog.models import Tag


@gql.django.type(Tag)
class TagType:
    id: gql.ID
    name: str
    active: str
