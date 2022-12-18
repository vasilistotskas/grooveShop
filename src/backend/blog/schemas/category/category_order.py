import strawberry_django
from backend.blog.models.category import BlogCategory
from strawberry import auto


@strawberry_django.ordering.order(BlogCategory)
class CategoryOrder:
    name: auto
