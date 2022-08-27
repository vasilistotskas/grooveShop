import os
import random
from faker import Faker
from random import randrange
from django.conf import settings
from django.utils.text import slugify
from backend.app.settings import BASE_DIR
from django.core.management import BaseCommand
from django.core.files.storage import default_storage
from backend.blog.models import Author, Tag, Post, Category
from django.core.files.uploadedfile import SimpleUploadedFile

User = settings.AUTH_USER_MODEL


class Command(BaseCommand):
    def handle(self, *args, **options):
        faker = Faker()

        user_id = randrange(1, 10)
        website = faker.text(20)
        bio = faker.text(50)

        img = 'uploads/products/no_photo.jpg'
        if not default_storage.exists(img):
            img_path = os.path.join(BASE_DIR, 'files/images') + '/no_photo.jpg'
            img = SimpleUploadedFile(name='no_photo.jpg', content=open(img_path, 'rb').read(),
                                     content_type='image/jpeg')

        author, created = Author.objects.get_or_create(
            defaults={'user_id': user_id, 'website': website, 'bio': bio}
        )

        try:
            intermediate_category = Category.objects.get(
                slug='intermediate',
            )
        except Category.DoesNotExist:
            intermediate_category = Category(
                name='Intermediate',
                slug='intermediate',
                description=faker.text(100),
            )
            intermediate_category.save()

        try:
            beginner_category = Category.objects.get(
                slug='beginner',
            )
        except Category.DoesNotExist:
            beginner_category = Category(
                name='Beginner',
                slug='beginner',
                description=faker.text(100),
            )
            beginner_category.save()

        try:
            master_category = Category.objects.get(
                slug='master',
            )
        except Category.DoesNotExist:
            master_category = Category(
                name='Master',
                slug='master',
                description=faker.text(100),
            )
            master_category.save()


        for _ in range(2):
            Tag.objects.create(
                name=faker.name(),
            )

        for _ in range(10):
            name = faker.name()
            Post.objects.create(
                title=name,
                subtitle=faker.text(20),
                slug=slugify(name),
                body=faker.text(100),
                meta_description=faker.text(10),
                published=True,
                author=Author.objects.get(id=author.id),
                image=img,
                category_id=random.randint(0, 3)
            )

        self.stdout.write(self.style.SUCCESS('Success'))
