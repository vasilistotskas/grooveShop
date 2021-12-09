from django.core.management import BaseCommand
from django.contrib.auth.models import User
from faker import Faker
from random import randrange
from blog.models import Profile, Tag, Post


class Command(BaseCommand):
    def handle(self, *args, **options):
        faker = Faker()

        user_id = randrange(1, 10)
        website = faker.text(20)
        bio = faker.text(50)

        profile, created = Profile.objects.get_or_create(
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
                image=faker.image_url(),
                author=Profile.objects.get(id=profile.id),
            )

        self.stdout.write(self.style.SUCCESS('Success'))