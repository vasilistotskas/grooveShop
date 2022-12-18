from typing import List

import strawberry.django
from backend.blog.models.comment import BlogComment
from backend.blog.schemas.comment.comment_input import CreateCommentInput
from backend.blog.schemas.comment.comment_partial_input import (
    UpdateCommentLikesPartialInput,
)
from backend.blog.schemas.comment.comment_partial_input import UpdateCommentPartialInput
from backend.blog.schemas.comment.comment_type import CommentType
from django.contrib.auth import get_user_model
from strawberry_django import mutations

User = get_user_model()


@strawberry.type
class Mutation:
    updateCommentLikes: List[CommentType] = mutations.update(
        UpdateCommentLikesPartialInput
    )
    createComment: List[CommentType] = mutations.create(CreateCommentInput)
    updateComment: List[CommentType] = mutations.update(UpdateCommentPartialInput)
    deleteComment: List[CommentType] = mutations.delete()

    @strawberry.mutation
    def update_comment_likes(
        self, comment_id: strawberry.ID, user_id: strawberry.ID
    ) -> CommentType:
        comment = BlogComment.objects.get(pk=comment_id)
        user = User.objects.get(id=user_id)
        if comment.likes.contains(user):
            comment.likes.remove(user)
        else:
            comment.likes.add(user)
        comment.save()
        return comment
