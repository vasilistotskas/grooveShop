from strawberry_django_plus import gql
from backend.blog.schemas.type.post_type import PostType
from backend.blog.schemas.filter.post_filter import UpdatePostLikesFilter
from backend.blog.schemas.input.post_input import UpdatePostLikesInputPartial


@gql.type
class Mutation:
    updatePostLikes: PostType = gql.django.update_mutation(
        UpdatePostLikesInputPartial,
        filters=UpdatePostLikesFilter
    )
