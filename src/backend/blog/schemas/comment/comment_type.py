from typing import List

import strawberry.django
import strawberry_django
from backend.app import settings
from backend.blog.models import Comment
from backend.blog.schemas.post.post_type import PostType
from backend.user.schemas.user.user_account_type import UserAccountType
from strawberry import auto

User = settings.AUTH_USER_MODEL


@strawberry_django.type(Comment)
class CommentType:
    id: strawberry.ID
    content: str
    created_at: auto
    is_approved: bool
    likes: List[UserAccountType]
    user: "UserAccountType"
    post: "PostType"

    @strawberry_django.field
    def number_of_likes(self) -> int:
        return len(self.likes)
