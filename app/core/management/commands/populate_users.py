from django.contrib.auth.models import User
from django.core.management import BaseCommand
from faker import Faker
fake = Faker()


class Command(BaseCommand):
    def handle(self, *args, **options):
        for i in range(0, 20):
            name = fake.name()
            first_name = name.split(' ')[0]
            last_name = ' '.join(name.split(' ')[-1:])
            username = first_name[0].lower() + last_name.lower().replace(' ', '')
            user = User.objects.create_user(username, password=username)
            user.first_name = first_name
            user.last_name = last_name
            user.is_superuser = False
            user.is_staff = False
            user.email = username + "@" + last_name.lower() + ".com"
            user.save()
        self.stdout.write(self.style.SUCCESS('Success'))