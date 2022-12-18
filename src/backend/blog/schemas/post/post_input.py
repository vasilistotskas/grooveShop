import strawberry.django
import strawberry_django
from backend.blog.models.post import BlogPost
from strawberry import auto


@strawberry_django.input(BlogPost)
class PostLikesInput:
    id: auto
    user_id: strawberry.ID


@strawberry_django.input(BlogPost, partial=True)
class PostLikesPartialInput(PostLikesInput):
    pass
