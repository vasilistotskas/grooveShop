from backend.blog.models.post import BlogPost
from backend.core.models import TimeStampMixinModel
from backend.core.models import UUIDModel
from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL


class BlogComment(TimeStampMixinModel, UUIDModel):
    id = models.AutoField(primary_key=True)
    content = models.TextField(max_length=1000)
    is_approved = models.BooleanField(default=False)

    # Each comment can receive likes from multiple users
    # and each user can like multiple comments
    likes = models.ManyToManyField(User, related_name="comment_like", blank=True)

    # Each comment belongs to one user and one post
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    post = models.ForeignKey(BlogPost, on_delete=models.SET_NULL, null=True)

    class Meta:
        unique_together = (("user", "post"),)
        ordering = ["-created_at"]

    def __str__(self):
        if len(self.content) > 50:
            comment: str = self.content[:50] + "..."
        else:
            comment = self.content
        return comment

    @property
    def number_of_likes(self) -> int:
        return self.likes.count()
