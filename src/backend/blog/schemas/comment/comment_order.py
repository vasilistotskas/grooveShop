import strawberry_django
from backend.blog.models import Comment
from backend.blog.schemas.post.post_order import PostOrder
from backend.user.schemas.user.user_account_order import UserAccountOrder
from strawberry import auto


@strawberry_django.ordering.order(Comment)
class CommentOrder:
    name: auto
    user: UserAccountOrder
    post: PostOrder
