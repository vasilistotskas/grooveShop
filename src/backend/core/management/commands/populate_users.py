from faker import Faker
from django.conf import settings
from backend.user.models import UserAccount
from django.core.management import BaseCommand

fake = Faker()
User = settings.AUTH_USER_MODEL


class Command(BaseCommand):
    def handle(self, *args, **options):
        for i in range(0, 20):
            name = fake.name()
            first_name = name.split(' ')[0]
            last_name = ' '.join(name.split(' ')[-1:])
            username = first_name[0].lower() + last_name.lower().replace(' ', '')
            email = username + "@" + last_name.lower() + ".com"
            user = UserAccount.objects.create_user(email, password=username)
            user.first_name = first_name
            user.last_name = last_name
            user.is_superuser = False
            user.is_staff = False
            user.save()
        self.stdout.write(self.style.SUCCESS('Success'))