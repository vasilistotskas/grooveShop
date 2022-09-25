import os
from random import randrange

from backend.app.settings import BASE_DIR
from backend.blog.models import Author
from backend.blog.models import Category
from backend.blog.models import Post
from backend.blog.models import Tag
from django.conf import settings
from django.core.files.storage import default_storage
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.management import BaseCommand
from django.utils.text import slugify
from faker import Faker

User = settings.AUTH_USER_MODEL


class Command(BaseCommand):
    @staticmethod
    def create_posts(author_id, img, category_id):
        faker = Faker()
        for _ in range(5):
            name = faker.name()
            Post.objects.create(
                title=name,
                subtitle=faker.text(20),
                slug=slugify(name),
                body=faker.text(100),
                meta_description=faker.text(10),
                is_published=True,
                author=Author.objects.get(id=author_id),
                image=img,
                category_id=category_id,
            )

    def handle(self, *args, **options):
        faker = Faker()

        user_id = randrange(1, 10)
        website = faker.text(20)
        bio = faker.text(50)

        img = "uploads/products/no_photo.jpg"
        if not default_storage.exists(img):
            img_path = os.path.join(BASE_DIR, "files/images") + "/no_photo.jpg"
            img = SimpleUploadedFile(
                name="no_photo.jpg",
                content=open(img_path, "rb").read(),
                content_type="image/jpeg",
            )

        author, created = Author.objects.get_or_create(
            defaults={"user_id": user_id, "website": website, "bio": bio}
        )

        try:
            intermediate_category = Category.objects.get(
                slug="intermediate",
            )
            self.create_posts(author.id, img, intermediate_category.id)
        except Category.DoesNotExist:
            intermediate_category = Category(
                name="Intermediate",
                slug="intermediate",
                description=faker.text(100),
            )
            intermediate_category.save()
            self.create_posts(author.id, img, intermediate_category.id)

        try:
            beginner_category = Category.objects.get(
                slug="beginner",
            )
            self.create_posts(author.id, img, beginner_category.id)
        except Category.DoesNotExist:
            beginner_category = Category(
                name="Beginner",
                slug="beginner",
                description=faker.text(100),
            )
            beginner_category.save()
            self.create_posts(author.id, img, beginner_category.id)

        try:
            master_category = Category.objects.get(
                slug="master",
            )
            self.create_posts(author.id, img, master_category.id)
        except Category.DoesNotExist:
            master_category = Category(
                name="Master",
                slug="master",
                description=faker.text(100),
            )
            master_category.save()
            self.create_posts(author.id, img, master_category.id)

        for _ in range(2):
            Tag.objects.create(
                name=faker.name(),
            )

        self.stdout.write(self.style.SUCCESS("Success"))
