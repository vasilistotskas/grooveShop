from typing import List
from typing import Optional

import strawberry.django
import strawberry_django
from backend.blog.models.comment import BlogComment
from backend.blog.schemas.comment.comment_type import CommentType


@strawberry.type
class Query:
    @strawberry_django.field
    def comments_by_post(self, post_id: int) -> List[CommentType]:
        comment_type_list: List[CommentType] = list(
            BlogComment.objects.select_related("post").filter(post__id=post_id)
        )
        return comment_type_list

    @strawberry_django.field
    def comments_by_user(self, user_email: str) -> List[CommentType]:
        comment_type_list: List[CommentType] = list(
            BlogComment.objects.select_related("user").filter(user__email=user_email)
        )
        return comment_type_list

    @strawberry_django.field
    def comment_by_user_to_post(
        self, post_id: int, user_email: str
    ) -> Optional[CommentType]:
        return (
            BlogComment.objects.select_related("post")
            .filter(post__id=post_id, user__email=user_email)
            .first()
        )
