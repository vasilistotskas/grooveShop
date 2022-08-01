import strawberry
from strawberry.tools import merge_types
from backend.tip.schema import Query as TipQuery
from backend.blog.schemas.query.tag_query import Query as TagQuery
from backend.blog.schemas.query.post_query import Query as PostQuery
from backend.blog.schemas.query.author_query import Query as AuthorQuery
from backend.blog.schemas.query.comment_query import Query as CommentQuery
from backend.blog.schemas.query.category_query import Query as CategoryQuery
from backend.blog.schemas.mutation.post_mutation import Mutation as PostMutation
from backend.blog.schemas.mutation.comment_mutation import Mutation as CommentMutation

Query = merge_types(
    'Query',
    (
        AuthorQuery,
        CategoryQuery,
        CommentQuery,
        PostQuery,
        TagQuery,
        TipQuery
    )
)
Mutation = merge_types(
    'Mutation',
    (
        CommentMutation,
        PostMutation
    )
)

schema = strawberry.Schema(query=Query, mutation=Mutation)
