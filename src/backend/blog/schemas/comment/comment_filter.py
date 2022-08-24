import strawberry
from strawberry.django import auth
from strawberry_django_plus import gql
from backend.blog.models import Comment, Post
from django.contrib.auth import get_user_model

User = get_user_model()


@strawberry.django.filters.filter(Comment)
class UpdateCommentLikesFilter:
    id: gql.ID
    user_id: gql.ID

    def filter(self, queryset):
        comment = Comment.objects.get(pk=self.id)
        user = User.objects.get(id=self.user_id)
        liked = False
        if comment.likes.contains(user):
            comment.likes.remove(user)
        else:
            comment.likes.add(user)
            liked = True
        comment.save()
        return comment


@strawberry.django.filters.filter(Comment)
class CreateCommentFilter:
    post_id: gql.ID
    user_email: str
    content: str

    def filter(self, queryset):
        user = User.objects.get(email=self.user_email)
        post = Post.objects.get(pk=self.post_id)
        comment = Comment.objects.create(content=self.content, user=user, post=post)
        comment.save()
        return comment


@strawberry.django.filters.filter(Comment)
class UpdateCommentFilter:
    comment_id: gql.ID
    content: str

    def filter(self, queryset):
        comment = Comment.objects.get(pk=self.comment_id)
        comment.content = self.content
        comment.save()
        return comment


@strawberry.django.filters.filter(Comment)
class DeleteCommentFilter:
    comment_id: gql.ID

    def filter(self, queryset):
        comment = Comment.objects.get(pk=self.comment_id)
        comment.delete()
        return True
