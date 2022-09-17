import strawberry_django
from backend.blog.models import Post
from backend.blog.schemas.author.author_order import AuthorOrder
from backend.blog.schemas.category.category_order import CategoryOrder
from strawberry import auto


@strawberry_django.ordering.order(Post)
class PostOrder:
    name: auto
    category: CategoryOrder
    author: AuthorOrder
