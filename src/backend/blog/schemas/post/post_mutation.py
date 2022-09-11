from typing import List
import strawberry.django
from strawberry_django import mutations
from backend.blog.schemas.post.post_type import PostType
from backend.blog.schemas.post.post_input import PostLikesPartialInput


@strawberry.type
class Mutation:
    updatePostLikes: List[PostType] = mutations.update(PostLikesPartialInput)
