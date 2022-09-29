import strawberry_django
from backend.blog.models import Category
from strawberry import auto


@strawberry_django.ordering.order(Category)
class CategoryOrder:
    name: auto
