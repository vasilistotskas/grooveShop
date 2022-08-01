from backend.blog.models import Post
from strawberry_django_plus import gql


@gql.django.input(Post)
class UpdatePostLikesInputPartial(gql.NodeInput):
    id: gql.ID
    user_id: gql.ID