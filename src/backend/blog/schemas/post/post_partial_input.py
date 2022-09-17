import strawberry.django
import strawberry_django
from backend.blog.models import Comment
from backend.blog.schemas.comment.comment_input import UpdateCommentInput
from backend.blog.schemas.comment.comment_input import UpdateCommentLikesInput


@strawberry_django.input(Comment, partial=True)
class UpdateCommentLikesPartialInput(UpdateCommentLikesInput):
    pass


@strawberry_django.input(Comment)
class UpdateCommentPartialInput(UpdateCommentInput):
    comment_id: strawberry.ID
    content: str
