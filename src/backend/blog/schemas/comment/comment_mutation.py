from typing import List
import strawberry.django
from strawberry_django import mutations
from backend.blog.models import Comment
from django.contrib.auth import get_user_model
from backend.blog.schemas.comment.comment_type import CommentType
from backend.blog.schemas.comment.comment_input import CreateCommentInput, \
    UpdateCommentPartialInput, UpdateCommentLikesPartialInput

User = get_user_model()


@strawberry.type
class Mutation:
    updateCommentLikes: List[CommentType] = mutations.update(UpdateCommentLikesPartialInput)
    createComment: List[CommentType] = mutations.create(CreateCommentInput)
    updateComment: List[CommentType] = mutations.update(UpdateCommentPartialInput)
    deleteComment: List[CommentType] = mutations.delete()

    @strawberry.mutation
    def update_comment_likes(self, comment_id: strawberry.ID, user_id: strawberry.ID) -> CommentType:
        comment = Comment.objects.get(pk=comment_id)
        user = User.objects.get(id=user_id)
        if comment.likes.contains(user):
            comment.likes.remove(user)
        else:
            comment.likes.add(user)
        comment.save()
        return comment

