import os
from typing import List

from backend.core.models import PublishableModel
from backend.core.models import SortableModel
from backend.core.models import TimeStampMixinModel
from backend.core.models import UUIDModel
from django.conf import settings
from django.db import models
from tinymce.models import HTMLField

User = settings.AUTH_USER_MODEL


class Author(TimeStampMixinModel, UUIDModel):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.PROTECT)
    website = models.URLField(blank=True, null=True)
    bio = models.CharField(max_length=240, blank=True, null=True)

    def __str__(self):
        return self.user.email


class Tag(TimeStampMixinModel, SortableModel, UUIDModel):
    TAG_STATUS = (
        ("True", "Active"),
        ("False", "Not Active"),
    )

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)
    active = models.CharField(max_length=15, choices=TAG_STATUS, default=True)

    def __str__(self):
        return self.name

    def get_ordering_queryset(self):
        return Tag.objects.all()


class Category(TimeStampMixinModel, SortableModel, UUIDModel):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    image = models.ImageField(upload_to="uploads/blog/", blank=True, null=True)

    class Meta:
        ordering: List[str] = ["-name"]

    def __str__(self):
        return self.name

    def get_ordering_queryset(self):
        return Category.objects.all()

    @property
    def main_image_absolute_url(self) -> str:
        image: str = ""
        if self.image is not None:
            return settings.BACKEND_BASE_URL + self.image.url
        return image

    @property
    def main_image_filename(self) -> str:
        if self.image:
            return os.path.basename(self.image.name)
        else:
            return ""


class Post(TimeStampMixinModel, PublishableModel, UUIDModel):
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
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    tags = models.ManyToManyField(Tag, related_name="post_tag", blank=True)
    author = models.ForeignKey(Author, on_delete=models.SET_NULL, null=True)

    class Meta:
        ordering: List[str] = ["-published_at"]

    def __str__(self):
        return self.title

    @property
    def main_image_absolute_url(self) -> str:
        image: str = ""
        if self.image:
            return settings.BACKEND_BASE_URL + self.image.url
        return image

    @property
    def main_image_filename(self) -> str:
        if self.image:
            return os.path.basename(self.image.name)
        else:
            return ""

    def number_of_likes(self):
        return self.likes.count()


class Comment(TimeStampMixinModel, UUIDModel):
    content = models.TextField(max_length=1000)
    is_approved = models.BooleanField(default=False)

    # Each comment can receive likes from multiple users
    # and each user can like multiple comments
    likes = models.ManyToManyField(User, related_name="comment_like", blank=True)

    # Each comment belongs to one user and one post
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    post = models.ForeignKey(Post, on_delete=models.SET_NULL, null=True)

    class Meta:
        unique_together: tuple[tuple[str, str]] = (("user", "post"),)
        ordering: List[str] = ["-created_at"]

    def __str__(self):
        if len(self.content) > 50:
            comment: str = self.content[:50] + "..."
        else:
            comment = self.content
        return comment

    def number_of_likes(self):
        return self.likes.count()
