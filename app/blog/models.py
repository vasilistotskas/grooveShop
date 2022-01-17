import os
from django.db import models
from django.conf import settings
from tinymce.models import HTMLField
from django.shortcuts import reverse

User = settings.AUTH_USER_MODEL


class Profile(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.PROTECT)
    website = models.URLField(blank=True, null=True)
    bio = models.CharField(max_length=240, blank=True, null=True)

    def __str__(self):
        return self.user.email


class Tag(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Post(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, unique=True)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    slug = models.SlugField(max_length=255, unique=True)
    body = HTMLField()
    meta_description = models.CharField(max_length=150, blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    publish_date = models.DateTimeField(blank=True, null=True)
    published = models.BooleanField(default=False)
    image = models.ImageField(upload_to='uploads/blog/', blank=True, null=True)
    author = models.ForeignKey(Profile, on_delete=models.PROTECT)
    tags = models.ManyToManyField(Tag, blank=True)

    class Meta:
        ordering = ["-publish_date"]

    @property
    def main_image_absolute_url(self):
        try:
            if self.id is not None:
                image = settings.APP_BASE_URL + self.image.url
            else:
                image = ""
            return image
        except:
            return ""

    @property
    def main_image_filename(self):
        try:
            return os.path.basename(self.image.name)
        except:
            return ""

    def get_absolute_url(self):
        return reverse("blog:post", kwargs={"slug": self.slug})
