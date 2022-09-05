from strawberry_django_plus import gql
from backend.blog.schemas.post.post_type import PostType
from backend.blog.schemas.post.post_filter import UpdatePostLikesFilter
from backend.blog.schemas.post.post_input import UpdatePostLikesInputPartial


@gql.type
class Mutation:
    updatePostLikes: PostType = gql.django.update_mutation(
        UpdatePostLikesInputPartial,
        filters=UpdatePostLikesFilter
    )
