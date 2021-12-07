from django.core.management import BaseCommand
from django.contrib.auth.models import User
from faker import Faker
from random import randrange
from blog.models import Profile, Tag, Post


class Command(BaseCommand):
    def handle(self, *args, **options):
        faker = Faker()

        Profile.objects.get_or_create(
            user_id=1,
            website=faker.text(20),
            bio=faker.text(50),
        )

        for _ in range(5):
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
                image=faker.image_url(),
                author=Profile.objects.get(id=1),
            )
