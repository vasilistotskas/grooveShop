import graphene
from .models import *
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model

User = get_user_model()


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()


class AuthorType(DjangoObjectType):
    class Meta:
        model = Profile


class PostType(DjangoObjectType):
    main_image_absolute_url = graphene.String(source='main_image_absolute_url')
    main_image_filename = graphene.String(source='main_image_filename')
    number_of_likes = graphene.Int(source='number_of_likes')

    class Meta:
        model = Post


class TagType(DjangoObjectType):
    class Meta:
        model = Tag


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category


class CommentType(DjangoObjectType):
    number_of_likes = graphene.Int(source='number_of_likes')

    class Meta:
        model = Comment


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
        return Comment.objects.select_related("user").filter(
            user__email=user_email
        )

    @staticmethod
    def resolve_comments_by_post(root, info, post_id):
        return Comment.objects.select_related("post").filter(
            post__id=post_id
        )

    @staticmethod
    def resolve_comment_by_user_to_post(root, info, post_id, user_email):
        return Comment.objects.select_related("post").filter(
            post__id=post_id,
            user__email=user_email
        )

    @staticmethod
    def resolve_all_posts(root, info):
        return (
            Post.objects.prefetch_related("tags")
                .select_related("author")
                .all()
        )

    @staticmethod
    def resolve_all_tags(root, info):
        return (
            Tag.objects.all()
        )

    @staticmethod
    def resolve_all_authors(root, info):
        return (
            Profile.objects.select_related("user").all()
        )

    @staticmethod
    def resolve_all_categories(root, info):
        return (
            Category.objects.all()
        )

    @staticmethod
    def resolve_author_by_email(root, info, email):
        return Profile.objects.select_related("user").get(
            user__email=email
        )

    @staticmethod
    def resolve_post_by_slug(root, info, slug):
        return (
            Post.objects.prefetch_related("tags")
                .select_related("author")
                .get(slug=slug)
        )

    @staticmethod
    def resolve_posts_by_author(root, info, email):
        return (
            Post.objects.prefetch_related("tags")
                .select_related("author")
                .filter(author__user__email=email)
        )

    @staticmethod
    def resolve_posts_by_tag(root, info, tag):
        return (
            Post.objects.prefetch_related("tags")
                .select_related("author")
                .filter(tags__name__iexact=tag)
        )


class UpdatePostLikesMutation(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        id = graphene.ID(required=True)
        user_email = graphene.String(required=True)

    # The class attributes define the response of the mutation
    post = graphene.Field(PostType)

    @classmethod
    def mutate(cls, root, info, user_email, id):
        post = Post.objects.get(pk=id)
        post.likes.add(User.objects.get(email=user_email))
        post.save()
        # Notice we return an instance of this mutation
        return UpdatePostLikesMutation(post=post)


class UpdateCommentLikesMutations(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        user_email = graphene.String(required=True)

    comment = graphene.Field(CommentType)

    @classmethod
    def mutate(cls, root, info, id, user_email):
        comment = Comment.objects.get(pk=id)
        comment.likes.add(User.objects.get(email=user_email))
        comment.save()
        return UpdateCommentLikesMutations(comment=comment)


class CommentCreateMutation(graphene.Mutation):
    class Arguments:
        post_id = graphene.ID(required=True)
        user_email = graphene.String(required=True)
        content = graphene.String(required=True)

    comment = graphene.Field(CommentType)

    @classmethod
    def mutate(cls, root, info, post_id, user_email, content):
        user = User.objects.get(email=user_email)
        post = Post.objects.get(pk=post_id)
        comment = Comment.objects.create(content=content, user=user, post=post)
        comment.save()
        return CommentCreateMutation(comment=comment)


class CommentDeleteMutation(graphene.Mutation):
    class Arguments:
        comment_id = graphene.ID(required=True)

    deleted = graphene.Boolean()

    @classmethod
    def mutate(cls, root, info, comment_id):
        comment = Comment.objects.get(pk=comment_id)
        comment.delete()
        return cls(deleted=True)


class Mutation(graphene.ObjectType):
    update_post_likes = UpdatePostLikesMutation.Field()
    update_comment_likes = UpdateCommentLikesMutations.Field()
    create_comment = CommentCreateMutation.Field()
    delete_comment = CommentDeleteMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
