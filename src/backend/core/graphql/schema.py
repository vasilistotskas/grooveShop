import strawberry.django
from backend.blog.schema import BlogMutation
from backend.blog.schema import BlogQueryType
from backend.tip.schema import Query as TipQuery
from strawberry.tools import merge_types

Query = merge_types("Query", BlogQueryType + (TipQuery,))

Mutation = merge_types("Mutation", BlogMutation)

schema = strawberry.Schema(query=Query, mutation=Mutation)
