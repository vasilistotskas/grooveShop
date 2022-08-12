from strawberry_django_plus import gql
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
    createComment: CommentType = gql.django.create_mutation(CreateCommentInput)
    updateComment: CommentType = gql.django.update_mutation(
        UpdateCommentInputPartial,
        filters=UpdateCommentFilter
    )
    deleteComment: CommentType = gql.django.delete_mutation(gql.NodeInput)
