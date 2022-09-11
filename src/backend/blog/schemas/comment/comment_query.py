import strawberry.django
from strawberry import auto
from typing import List, Optional
from backend.blog.models import Comment
from backend.blog.schemas.comment.comment_type import CommentType


@strawberry.type
class Query:

    @strawberry.django.field
    def comments_by_post(self, post_id: auto) -> List[CommentType]:
        return Comment.objects.select_related("post").filter(
            post__id=post_id
        )

    @strawberry.django.field
    def comments_by_user(self, user_email: str) -> List[CommentType]:
        return Comment.objects.select_related("user").filter(
            user__email=user_email
        )

    @strawberry.django.field
    def comment_by_user_to_post(self, post_id: auto, user_email: str) -> Optional[CommentType]:
        return Comment.objects.select_related("post").filter(
            post__id=post_id,
            user__email=user_email
        ).first()
