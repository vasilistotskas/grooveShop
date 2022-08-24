from strawberry_django_plus import gql
from backend.blog.models import Comment
from django.contrib.auth import get_user_model
from backend.blog.schemas.comment.comment_type import CommentType
from backend.blog.schemas.comment.comment_filter import UpdateCommentLikesFilter, UpdateCommentFilter
from backend.blog.schemas.comment.comment_input import UpdateCommentLikesInputPartial, \
    CreateCommentInput, \
    UpdateCommentInputPartial

User = get_user_model()


@gql.type
class Mutation:
    updateCommentLikes: CommentType = gql.django.update_mutation(
        UpdateCommentLikesInputPartial,
        filters=UpdateCommentLikesFilter
    )

    @gql.mutation
    def update_comment_likes(self, comment_id: gql.ID, user_id: gql.ID) -> CommentType:
        comment = Comment.objects.get(pk=comment_id)
        user = User.objects.get(id=user_id)
        if comment.likes.contains(user):
            comment.likes.remove(user)
        else:
            comment.likes.add(user)
        comment.save()
        return comment

    createComment: CommentType = gql.django.create_mutation(CreateCommentInput)
    updateComment: CommentType = gql.django.update_mutation(
        UpdateCommentInputPartial,
        filters=UpdateCommentFilter
    )
    deleteComment: CommentType = gql.django.delete_mutation(gql.NodeInput)
