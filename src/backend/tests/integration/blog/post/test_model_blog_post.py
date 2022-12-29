from __future__ import annotations

import os

from backend.app.settings import BASE_DIR
from backend.blog.models.author import BlogAuthor
from backend.blog.models.category import BlogCategory
from backend.blog.models.post import BlogPost
from backend.blog.models.tag import BlogTag
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.files.storage import default_storage
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase

User = get_user_model()


class BlogPostTestCase(TestCase):
    image: str | SimpleUploadedFile = ""

    def setUp(self):
        user = User.objects.create_user(password="bar", email="email@email.com")
        author = BlogAuthor.objects.create(
            user_id=user.id, website="https://www.google.com", bio="bio"
        )
        category = BlogCategory.objects.create(
            name="name", slug="slug", description="description"
        )
        post = BlogPost.objects.create(
            title="title",
            slug="slug",
            author_id=author.id,
            category_id=category.id,
            image=self.image,
        )
        tag = BlogTag.objects.create(name="name")
        post.tags.add(tag)

    def test___str__(self):
        post = BlogPost.objects.get(title="title")
        self.assertEqual(str(post), post.title)

    def test_get_main_image_filename(self):
        post = BlogPost.objects.get(title="title")
        image: str = ""
        if post.image is not None:
            image = os.path.basename(post.image.name)
        self.assertEqual(post.main_image_filename, image)

    def test_main_image_absolute_url(self):
        post = BlogPost.objects.get(title="title")
        image: str = ""
        if post.image and hasattr(post.image, "url"):
            image = settings.BACKEND_BASE_URL + post.image.url
        self.assertEqual(post.main_image_absolute_url, image)

    def test_number_of_likes(self):
        post = BlogPost.objects.get(title="title")
        self.assertEqual(post.number_of_likes, 0)

    def test_number_of_comments(self):
        post = BlogPost.objects.get(title="title")
        self.assertEqual(post.number_of_comments, 0)

    def test_get_post_tags_count(self):
        post = BlogPost.objects.get(title="title")
        self.assertEqual(post.get_post_tags_count, 1)


class WithImage(BlogPostTestCase):
    image: str | SimpleUploadedFile = "uploads/products/no_photo.jpg"
    if not default_storage.exists(image):
        image_path = os.path.join(BASE_DIR, "files/images") + "/no_photo.jpg"
        image = SimpleUploadedFile(
            name="no_photo.jpg",
            content=open(image_path, "rb").read(),
            content_type="image/jpeg",
        )


class WithoutImage(BlogPostTestCase):
    image: str | SimpleUploadedFile = ""
