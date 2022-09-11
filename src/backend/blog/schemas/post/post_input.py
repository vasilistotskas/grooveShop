import strawberry.django
import strawberry_django
from strawberry import auto
from backend.blog.models import Post


@strawberry_django.input(Post)
class PostLikesInput:
    id: auto
    user_id: strawberry.ID


@strawberry_django.input(Post, partial=True)
class PostLikesPartialInput(PostLikesInput):
    pass