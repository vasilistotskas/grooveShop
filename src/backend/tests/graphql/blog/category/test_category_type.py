import os
from typing import Union

import strawberry.django
from backend.app.settings import BASE_DIR
from backend.blog.models.category import BlogCategory
from django.conf import settings
from django.core.files.storage import default_storage
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from strawberry import auto


class CategoryTypeTestCase(TestCase):
    id: strawberry.ID
    name: str
    slug: auto
    description: str
    image: Union[str, SimpleUploadedFile] = ""

    def setUp(self):
        BlogCategory.objects.create(
            name="name", description="description", image=self.image
        )

    def test_main_image_absolute_url(self):
        category = BlogCategory.objects.get(name="name")
        image: str = ""
        if category.image and hasattr(category.image, "url"):
            image = settings.BACKEND_BASE_URL + category.image.url
        self.assertEqual(category.main_image_absolute_url, image)

    def test_get_main_image_filename(self):
        category = BlogCategory.objects.get(name="name")
        image: str = ""
        if category.image is not None:
            image = os.path.basename(category.image.name)
        self.assertEqual(category.main_image_filename, image)


class WithImage(CategoryTypeTestCase):
    image: Union[str, SimpleUploadedFile] = "uploads/blog/no_photo.jpg"
    if not default_storage.exists(image):
        image_path = os.path.join(BASE_DIR, "files/images") + "/no_photo.jpg"
        image = SimpleUploadedFile(
            name="no_photo.jpg",
            content=open(image_path, "rb").read(),
            content_type="image/jpeg",
        )


class WithoutImage(CategoryTypeTestCase):
    image: Union[str, SimpleUploadedFile] = ""
