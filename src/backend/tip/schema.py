import graphene
from backend.tip.models import Tip
from graphene_django import DjangoObjectType


class TipType(DjangoObjectType):
    main_image_absolute_url = graphene.String(source='main_image_absolute_url')
    main_image_filename = graphene.String(source='main_image_filename')

    class Meta:
        model = Tip


class Query(graphene.ObjectType):
    all_tips = graphene.List(TipType)

    @staticmethod
    def resolve_all_tips(root, info):
        return (
            Tip.objects.all()
        )
