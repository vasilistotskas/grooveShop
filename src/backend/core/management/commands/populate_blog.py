from faker import Faker
from random import randrange
from django.conf import settings
from django.core.management import BaseCommand
from backend.blog.models import Author, Tag, Post

User = settings.AUTH_USER_MODEL


class Command(BaseCommand):
    def handle(self, *args, **options):
        faker = Faker()

        user_id = randrange(1, 10)
        website = faker.text(20)
        bio = faker.text(50)

        author, created = Author.objects.get_or_create(
            defaults={'user_id': user_id, 'website': website, 'bio': bio}
        )

        for _ in range(2):
            Tag.objects.create(
                name=faker.name(),
            )

        for _ in range(10):
            Post.objects.create(
                title=faker.name(),
                subtitle=faker.text(20),
                slug=faker.text(10),
                body=faker.text(100),
                meta_description=faker.text(10),
                published=True,
                image='uploads/slides/WallpaperDog-10724660.jpg',
                author=Author.objects.get(id=author.id),
            )

        self.stdout.write(self.style.SUCCESS('Success'))