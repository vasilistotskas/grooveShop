import strawberry.django
from backend.blog.schemas.author.author_query import Query as AuthorQuery
from backend.blog.schemas.category.category_query import Query as CategoryQuery
from backend.blog.schemas.comment.comment_mutation import Mutation as CommentMutation
from backend.blog.schemas.comment.comment_query import Query as CommentQuery
from backend.blog.schemas.post.post_mutation import Mutation as PostMutation
from backend.blog.schemas.post.post_query import Query as PostQuery
from backend.blog.schemas.tag.tag_query import Query as TagQuery
from backend.tip.schema import Query as TipQuery
from strawberry.tools import merge_types

Query = merge_types(
    "Query",
    (
        AuthorQuery,
        CategoryQuery,
        CommentQuery,
        PostQuery,
        TagQuery,
        TipQuery,
    ),
)
Mutation = merge_types("Mutation", (CommentMutation, PostMutation))

schema = strawberry.Schema(query=Query, mutation=Mutation)
