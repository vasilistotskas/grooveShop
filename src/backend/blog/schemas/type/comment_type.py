from typing import List
from backend.app import settings
from strawberry_django_plus import gql
from backend.blog.models import Comment
from backend.blog.schemas.type.post_type import PostType
from backend.user.schemas.type.user_account_type import UserAccountType

User = settings.AUTH_USER_MODEL


@gql.django.type(Comment)
class CommentType:
    id: gql.ID
    content: str
    created_at: gql.auto
    is_approved: bool
    likes: List[UserAccountType]
    user: 'UserAccountType'
    post: 'PostType'

    @gql.django.field
    def number_of_likes(self) -> int:
        return self.likes.count()
