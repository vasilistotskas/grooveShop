from typing import List
from strawberry_django_plus import gql
from backend.blog.models import Post
from backend.blog.schemas.post.post_type import PostType
from backend.blog.schemas.post.post_filter import PostsByAuthorFilter, PostsByAuthorTag


@gql.type
class Query:
    allPosts: List[PostType] = gql.django.field()
    postsByAuthor: List[PostType] = gql.django.field(filters=PostsByAuthorFilter)
    postsByTag: List[PostType] = gql.django.field(filters=PostsByAuthorTag)

    @gql.field
    def post_by_slug(self, slug: str) -> PostType:
        return (
            Post.objects.prefetch_related("tags")
            .select_related("author")
            .get(slug=slug)
        )

