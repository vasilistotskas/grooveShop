from typing import List
from strawberry_django_plus import gql
from backend.blog.models import Post
from backend.blog.schemas.type.post_type import PostType
from backend.blog.schemas.filter.post_filter import PostBySlugFilter, PostsByAuthorFilter, \
    PostsByAuthorTag


@gql.type
class Query:
    allPosts: List[PostType] = gql.django.field()

    @gql.field
    def post_by_slug(self, slug: str) -> PostType:
        return (
            Post.objects.prefetch_related("tags")
            .select_related("author")
            .get(slug=slug)
        )

    postsByAuthor: List[PostType] = gql.django.field(filters=PostsByAuthorFilter)
    postsByTag: List[PostType] = gql.django.field(filters=PostsByAuthorTag)
