import graphene
from backend.blog.schema import Query as BlogQuery
from backend.blog.schema import Mutation as BlogMutation
from backend.tip.schema import Query as TipQuery


class Query(BlogQuery, TipQuery):
    pass


class Mutation(BlogMutation):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)