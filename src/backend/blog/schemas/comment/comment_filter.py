import strawberry.django
import strawberry_django
from backend.blog.models.comment import BlogComment
from backend.blog.models.post import BlogPost
from django.contrib.auth import get_user_model

User = get_user_model()


@strawberry_django.filters.filter(BlogComment)
class UpdateCommentLikesFilter:
    id: strawberry.ID
    user_id: strawberry.ID

    def filter(self, queryset):
        comment = BlogComment.objects.get(pk=self.id)
        user = User.objects.get(id=self.user_id)
        if comment.likes.contains(user):
            comment.likes.remove(user)
        else:
            comment.likes.add(user)
        comment.save()
        return comment


@strawberry_django.filters.filter(BlogComment)
class CreateCommentFilter:
    post_id: strawberry.ID
    user_email: str
    content: str

    def filter(self, queryset):
        user = User.objects.get(email=self.user_email)
        post = BlogPost.objects.get(pk=self.post_id)
        comment = BlogComment.objects.create(content=self.content, user=user, post=post)
        comment.save()
        return comment


@strawberry_django.filters.filter(BlogComment)
class UpdateCommentFilter:
    comment_id: strawberry.ID
    content: str

    def filter(self, queryset) -> BlogComment:
        comment = BlogComment.objects.get(pk=self.comment_id)
        comment.content = self.content
        comment.save()
        return comment


@strawberry_django.filters.filter(BlogComment)
class DeleteCommentFilter:
    comment_id: strawberry.ID

    def filter(self, queryset):
        comment = BlogComment.objects.get(pk=self.comment_id)
        comment.delete()
        return True
