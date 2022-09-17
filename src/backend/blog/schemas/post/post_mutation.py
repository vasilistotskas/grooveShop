from typing import List

import strawberry.django
from backend.blog.schemas.post.post_input import PostLikesPartialInput
from backend.blog.schemas.post.post_type import PostType
from strawberry_django import mutations


@strawberry.type
class Mutation:
    updatePostLikes: List[PostType] = mutations.update(PostLikesPartialInput)
