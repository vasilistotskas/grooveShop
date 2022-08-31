from backend.blog.models import Post
from strawberry_django_plus import gql
from typing import List, Optional, cast
from backend.blog.schemas.post.post_type import PostType
from backend.core.graphql.pagination import PageMeta, PaginatedResponse, encode_cursor, \
    decode_cursor, PaginationBase


@gql.type
class Query:
    @gql.field(description="Get a list of posts.")
    def all_posts(self, limit: int, cursor: Optional[str] = None) -> PaginatedResponse[PostType]:
        pagination_base = PaginationBase()
        post_data = Post.objects.all()
        if cursor is not None:
            post_id = decode_cursor(cursor=cursor)
        else:
            post_id = 0

        filtered_data = list(
            filter(None, list(map(lambda post: post if post.id >= post_id else None, post_data)))
        )
        posts_count = post_data.count()
        total_pages = int(posts_count / limit)
        start_cursor = encode_cursor(post_data.order_by('id').first().id, 'post')
        end_cursor = encode_cursor(post_data.order_by('id')[posts_count - limit].id, 'post')

        post_chunks = list(pagination_base.create_chunks(
            list(map(lambda post: post.id, post_data)), limit)
        )

        current_page_number = 1
        if pagination_base.find_in_matrix_list(post_id, post_chunks) != -1:
            id_position = pagination_base.find_in_matrix_list(post_id, post_chunks)
            current_page_number = id_position[0]

        sliced_posts = filtered_data[:limit + 1]
        if len(sliced_posts) > limit:
            last_post = sliced_posts.pop(-1)
            next_cursor = encode_cursor(last_post.id, 'post')
        else:
            next_cursor = None

        has_previous_page = current_page_number > 1

        sliced_posts = cast(List[PostType], sliced_posts)
        return PaginatedResponse(
            collection=sliced_posts,
            page_meta=PageMeta(
                has_previous_page=has_previous_page,
                has_next_page=len(filtered_data) > limit,
                count=posts_count,
                total_pages=total_pages,
                next_cursor=next_cursor,
                start_cursor=start_cursor,
                end_cursor=end_cursor,
                current_page_number=current_page_number
            )
        )

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
