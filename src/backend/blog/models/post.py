import os

from backend.blog.models.author import BlogAuthor
from backend.blog.models.category import BlogCategory
from backend.blog.models.tag import BlogTag
from backend.core.models import PublishableModel
from backend.core.models import TimeStampMixinModel
from backend.core.models import UUIDModel
from django.conf import settings
from django.db import models
from tinymce.models import HTMLField

User = settings.AUTH_USER_MODEL


class BlogPost(TimeStampMixinModel, PublishableModel, UUIDModel):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, unique=True)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    slug = models.SlugField(max_length=255, unique=True)
    body = HTMLField()
    meta_description = models.CharField(max_length=150, blank=True, null=True)
    image = models.ImageField(upload_to="uploads/blog/", blank=True, null=True)

    # Each post can receive likes from multiple users, and each user can like multiple posts
    likes = models.ManyToManyField(User, related_name="post_like")

    # Each post belong to one author and one category.
    # Each post has many tags, and each tag has many posts.
    category = models.ForeignKey(BlogCategory, on_delete=models.SET_NULL, null=True)
    tags = models.ManyToManyField(BlogTag, related_name="post_tag", blank=True)
    author = models.ForeignKey(BlogAuthor, on_delete=models.SET_NULL, null=True)

    class Meta:
        ordering = ["-published_at"]

    def __str__(self):
        return self.title

    @property
    def main_image_absolute_url(self) -> str:
        image: str = ""
        if self.image and hasattr(self.image, "url"):
            return settings.BACKEND_BASE_URL + self.image.url
        return image

    @property
    def main_image_filename(self) -> str:
        if self.image and hasattr(self.image, "name"):
            return os.path.basename(self.image.name)
        else:
            return ""

    @property
    def number_of_likes(self) -> int:
        return self.likes.count()

    @property
    def number_of_comments(self) -> int:
        return self.blogcomment_set.count()

    @property
    def get_post_tags_count(self) -> int:
        return self.tags.count()
