from strawberry_django_plus import gql
from backend.blog.models import Comment


@gql.django.input(Comment)
class UpdateCommentLikesInputPartial(gql.NodeInput):
    id: gql.ID
    user_id: gql.ID


@gql.django.input(Comment)
class CreateCommentInput:
    post_id: gql.ID
    user_email: str
    content: str


@gql.django.partial(Comment)
class UpdateCommentInputPartial(gql.NodeInput):
    comment_id: gql.ID
    content: str


@gql.django.input(Comment)
class DeleteCommentInput:
    comment_id: gql.ID
