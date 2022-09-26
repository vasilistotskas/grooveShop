from typing import cast
from typing import List
from typing import Optional

import strawberry.django
import strawberry_django
from backend.blog.models import Post
from backend.blog.schemas.post.post_type import PostType
from backend.core.graphql.pagination import PageMeta
from backend.core.graphql.pagination import PaginatedResponse
from backend.core.graphql.pagination import PaginationBase
from django.db.models import QuerySet


@strawberry.type
class Query:
    @strawberry_django.field(description="Get a list of posts.")
    def all_posts(
        self, limit: int, cursor: Optional[str] = None
    ) -> PaginatedResponse[PostType]:
        pagination_base = PaginationBase()
        post_data: QuerySet[Post] = Post.objects.all()
        if cursor is not None:
            post_id = pagination_base.decode_cursor(cursor=cursor)
        else:
            post_id = 0

        filtered_data: List[Post] = list(
            filter(
                None,
                list(map(lambda post: post if post.id >= post_id else None, post_data)),
            )
        )
        posts_count = post_data.count()
        total_pages = int(posts_count / limit)
        start_item = list(post_data[:1])[0]
        start_cursor = pagination_base.encode_cursor(start_item.id, "post")
        end_cursor = pagination_base.encode_cursor(
            post_data.order_by("id")[posts_count - limit].id, "post"
        )

        post_chunks = list(
            pagination_base.create_chunks(
                list(map(lambda post: post.id, post_data)), limit
            )
        )

        current_page_number = 1
        if pagination_base.find_in_matrix_list(post_id, post_chunks) != -1:
            id_position = pagination_base.find_in_matrix_list(post_id, post_chunks)
            current_page_number = id_position[0]

        sliced_posts = filtered_data[: limit + 1]
        if len(sliced_posts) > limit:
            last_post = sliced_posts.pop(-1)
            next_cursor = pagination_base.encode_cursor(last_post.id, "post")
        else:
            next_cursor = None

        has_previous_page = current_page_number > 1
        has_next_page = len(filtered_data) > limit

        sliced_posts = cast(List[PostType], sliced_posts)
        return PaginatedResponse(
            collection=sliced_posts,
            page_meta=PageMeta(
                has_previous_page=has_previous_page,
                has_next_page=has_next_page,
                count=posts_count,
                total_pages=total_pages,
                next_cursor=next_cursor,
                start_cursor=start_cursor,
                end_cursor=end_cursor,
                current_page_number=current_page_number,
            ),
        )

    @strawberry_django.field
    def posts_by_tag(self, tag: str) -> List[PostType]:
        post_type_list: List[PostType] = list(
            Post.objects.prefetch_related("tags")
            .select_related("author")
            .filter(tags__name__iexact=tag)
        )
        return post_type_list

    @strawberry_django.field
    def post_by_slug(self, slug: str) -> PostType:
        return (
            Post.objects.prefetch_related("tags")
            .select_related("author")
            .get(slug=slug)
        )

    @strawberry_django.field
    def posts_by_author_id(self, author_id: int) -> List[PostType]:
        post_type_list: List[PostType] = list(
            Post.objects.prefetch_related("tags").filter(
                author__id=author_id,
            )
        )
        return post_type_list
