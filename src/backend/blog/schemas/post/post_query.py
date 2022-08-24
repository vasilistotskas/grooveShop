from typing import List
from strawberry_django_plus import gql
from backend.blog.models import Post
from backend.blog.schemas.post.post_type import PostType


@gql.type
class Query:
    allPosts: List[PostType] = gql.django.field()

    @gql.field
    def posts_by_tag(self, tag: str) -> List[PostType]:
        return (
            Post.objects.prefetch_related("tags")
            .select_related("author")
            .filter(tags__name__iexact=tag)
        )

    @gql.field
    def post_by_slug(self, slug: str) -> PostType:
        return (
            Post.objects.prefetch_related("tags")
            .select_related("author")
            .get(slug=slug)
        )

    @gql.field
    def posts_by_author_id(self, author_id: str) -> List[PostType]:
        return (
            Post.objects.prefetch_related("tags")
            .filter(
                author__id=author_id,
            )
        )
