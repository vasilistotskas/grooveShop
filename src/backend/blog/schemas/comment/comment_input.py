import strawberry.django
import strawberry_django
from backend.blog.models.comment import BlogComment


# input types


@strawberry_django.input(BlogComment)
class UpdateCommentLikesInput:
    id: strawberry.ID
    user_id: strawberry.ID


@strawberry_django.input(BlogComment)
class UpdateCommentInput:
    comment_id: strawberry.ID
    content: str


@strawberry_django.input(BlogComment)
class CreateCommentInput:
    post_id: strawberry.ID
    user_email: str
    content: str


@strawberry_django.input(BlogComment)
class DeleteCommentInput:
    comment_id: strawberry.ID
