import strawberry.django
import strawberry_django
from backend.blog.models.comment import BlogComment
from backend.blog.schemas.comment.comment_input import UpdateCommentInput
from backend.blog.schemas.comment.comment_input import UpdateCommentLikesInput


@strawberry_django.input(BlogComment, partial=True)
class UpdateCommentLikesPartialInput(UpdateCommentLikesInput):
    pass


@strawberry_django.input(BlogComment)
class UpdateCommentPartialInput(UpdateCommentInput):
    comment_id: strawberry.ID
    content: str
