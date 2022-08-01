from typing import List, Optional
from strawberry_django_plus import gql
from backend.blog.models import Comment
from backend.blog.schemas.type.comment_type import CommentType
from backend.blog.schemas.filter.comment_filter import CommentsByUserFilter, CommentsByPostFilter


@gql.type
class Query:
    commentsByUser: List[CommentType] = gql.django.field(filters=CommentsByUserFilter)
    commentsByPost: List[CommentType] = gql.django.field(filters=CommentsByPostFilter)

    @gql.field
    def comment_by_user_to_post(self, post_id: gql.ID, user_email: str) -> Optional[CommentType]:
        return Comment.objects.select_related("post").filter(
            post__id=post_id,
            user__email=user_email
        ).first()
