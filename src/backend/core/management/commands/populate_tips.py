import os
import random
from faker import Faker
from backend.tip.models import Tip
from backend.app.settings import BASE_DIR
from django.core.management import BaseCommand
from django.core.files.storage import default_storage
from django.core.files.uploadedfile import SimpleUploadedFile


class Command(BaseCommand):
    def handle(self, *args, **options):
        faker = Faker()

        img = 'uploads/tip/no_photo.jpg'
        if not default_storage.exists(img):
            img_path = os.path.join(BASE_DIR, 'files/images') + '/no_photo.jpg'
            img = SimpleUploadedFile(name='no_photo.jpg', content=open(img_path, 'rb').read(), content_type='image/jpeg')

        tip_kinds = ['success', 'info', 'error', 'warning']

        for _ in range(4):
            obj, created = Tip.objects.get_or_create(
                title=faker.text(20),
                content=faker.text(50),
                kind=random.choice(tip_kinds),
                icon=img,
                url='http://localhost:8010/',
                created_at=faker.date_time(),
                active=True
            )
        self.stdout.write(self.style.SUCCESS('Success'))
