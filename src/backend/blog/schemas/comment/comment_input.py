import strawberry
import strawberry_django

from backend.blog.models import Comment


# input types


@strawberry_django.input(Comment)
class UpdateCommentLikesInput:
    id: strawberry.ID
    user_id: strawberry.ID


@strawberry_django.input(Comment)
class UpdateCommentInput:
    comment_id: strawberry.ID
    content: str


@strawberry_django.input(Comment)
class CreateCommentInput:
    post_id: strawberry.ID
    user_email: str
    content: str


@strawberry_django.input(Comment)
class DeleteCommentInput:
    comment_id: strawberry.ID


# partial input types


@strawberry_django.input(Comment, partial=True)
class UpdateCommentLikesPartialInput(UpdateCommentLikesInput):
    pass


@strawberry_django.input(Comment)
class UpdateCommentPartialInput(UpdateCommentInput):
    comment_id: strawberry.ID
    content: str
