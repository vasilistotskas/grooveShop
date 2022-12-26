import strawberry_django
from backend.blog.models.post import BlogPost
from backend.blog.schemas.author.author_order import AuthorOrder
from backend.blog.schemas.category.category_order import CategoryOrder
from strawberry import auto


@strawberry_django.ordering.order(BlogPost)
class PostOrder:
    name: auto
    category: CategoryOrder
    author: AuthorOrder
