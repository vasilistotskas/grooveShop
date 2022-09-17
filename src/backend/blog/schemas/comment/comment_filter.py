import strawberry.django
import strawberry_django
from backend.blog.models import Comment
from backend.blog.models import Post
from django.contrib.auth import get_user_model

User = get_user_model()


@strawberry_django.filters.filter(Comment)
class UpdateCommentLikesFilter:
    id: strawberry.ID
    user_id: strawberry.ID

    def filter(self, queryset):
        comment = Comment.objects.get(pk=self.id)
        user = User.objects.get(id=self.user_id)
        if comment.likes.contains(user):
            comment.likes.remove(user)
        else:
            comment.likes.add(user)
        comment.save()
        return comment


@strawberry_django.filters.filter(Comment)
class CreateCommentFilter:
    post_id: strawberry.ID
    user_email: str
    content: str

    def filter(self, queryset):
        user = User.objects.get(email=self.user_email)
        post = Post.objects.get(pk=self.post_id)
        comment = Comment.objects.create(content=self.content, user=user, post=post)
        comment.save()
        return comment


@strawberry_django.filters.filter(Comment)
class UpdateCommentFilter:
    comment_id: strawberry.ID
    content: str

    def filter(self, queryset) -> Comment:
        comment = Comment.objects.get(pk=self.comment_id)
        comment.content = self.content
        comment.save()
        return comment


@strawberry_django.filters.filter(Comment)
class DeleteCommentFilter:
    comment_id: strawberry.ID

    def filter(self, queryset):
        comment = Comment.objects.get(pk=self.comment_id)
        comment.delete()
        return True
