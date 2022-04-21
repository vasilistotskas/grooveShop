import graphene
from . import models
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()


class AuthorType(DjangoObjectType):
    class Meta:
        model = models.Profile


class PostType(DjangoObjectType):
    main_image_absolute_url = graphene.String(source='main_image_absolute_url')
    main_image_filename = graphene.String(source='main_image_filename')
    number_of_likes = graphene.Int(source='number_of_likes')

    class Meta:
        model = models.Post


class TagType(DjangoObjectType):
    class Meta:
        model = models.Tag


class CategoryType(DjangoObjectType):
    class Meta:
        model = models.Category


class CommentType(DjangoObjectType):
    number_of_likes = graphene.Int(source='number_of_likes')

    class Meta:
        model = models.Comment


class Query(graphene.ObjectType):
    all_posts = graphene.List(PostType)
    all_tags = graphene.List(TagType)
    all_authors = graphene.List(AuthorType)
    all_categories = graphene.List(CategoryType)
    comments_by_user = graphene.List(CommentType, user_email=graphene.String())
    comments_by_post = graphene.List(CommentType, post_id=graphene.Int())
    comment_by_user_to_post = graphene.List(CommentType, user_email=graphene.String(), post_id=graphene.Int())
    author_by_email = graphene.Field(AuthorType, email=graphene.String())
    post_by_slug = graphene.Field(PostType, slug=graphene.String())
    posts_by_author = graphene.List(PostType, email=graphene.String())
    posts_by_tag = graphene.List(PostType, tag=graphene.String())

    @staticmethod
    def resolve_comments_by_user(root, info, user_email):
        return models.Comment.objects.select_related("user").filter(
            user__email=user_email
        )

    @staticmethod
    def resolve_comments_by_post(root, info, post_id):
        return models.Comment.objects.select_related("post").filter(
            post__id=post_id
        )

    @staticmethod
    def resolve_comment_by_user_to_post(root, info, post_id, user_email):
        return models.Comment.objects.select_related("post").filter(
            post__id=post_id,
            user__email=user_email
        )

    @staticmethod
    def resolve_all_posts(root, info):
        return (
            models.Post.objects.prefetch_related("tags")
                .select_related("author")
                .all()
        )

    @staticmethod
    def resolve_all_tags(root, info):
        return (
            models.Tag.objects.all()
        )

    @staticmethod
    def resolve_all_authors(root, info):
        return (
            models.Profile.objects.select_related("user").all()
        )

    @staticmethod
    def resolve_all_categories(root, info):
        return (
            models.Category.objects.all()
        )

    @staticmethod
    def resolve_author_by_email(root, info, email):
        return models.Profile.objects.select_related("user").get(
            user__email=email
        )

    @staticmethod
    def resolve_post_by_slug(root, info, slug):
        return (
            models.Post.objects.prefetch_related("tags")
                .select_related("author")
                .get(slug=slug)
        )

    @staticmethod
    def resolve_posts_by_author(root, info, email):
        return (
            models.Post.objects.prefetch_related("tags")
                .select_related("author")
                .filter(author__user__email=email)
        )

    @staticmethod
    def resolve_posts_by_tag(root, info, tag):
        return (
            models.Post.objects.prefetch_related("tags")
                .select_related("author")
                .filter(tags__name__iexact=tag)
        )


schema = graphene.Schema(query=Query)
