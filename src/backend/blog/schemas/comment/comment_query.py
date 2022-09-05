from typing import List, Optional
from strawberry_django_plus import gql
from backend.blog.models import Comment
from backend.blog.schemas.comment.comment_type import CommentType


@gql.type
class Query:

    @gql.field
    def comments_by_post(self, post_id: gql.ID) -> List[CommentType]:
        return Comment.objects.select_related("post").filter(
            post__id=post_id
        )

    @gql.field
    def comments_by_user(self, user_email: str) -> List[CommentType]:
        return Comment.objects.select_related("user").filter(
            user__email=user_email
        )

    @gql.field
    def comment_by_user_to_post(self, post_id: gql.ID, user_email: str) -> Optional[CommentType]:
        return Comment.objects.select_related("post").filter(
            post__id=post_id,
            user__email=user_email
        ).first()
