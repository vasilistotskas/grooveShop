from typing import List

import strawberry.django
import strawberry_django
from backend.app import settings
from backend.blog.models.comment import BlogComment
from backend.blog.schemas.post.post_type import PostType
from backend.user.schemas.user.user_account_type import UserAccountType
from strawberry import auto

User = settings.AUTH_USER_MODEL


@strawberry_django.type(BlogComment)
class CommentType:
    id: strawberry.ID
    content: str
    created_at: auto
    is_approved: bool
    likes: List[UserAccountType]
    user: "UserAccountType"
    post: "PostType"
    number_of_likes: int
