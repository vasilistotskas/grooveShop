import os

from backend.app.settings import BASE_DIR
from backend.slider.models import Slide
from backend.slider.models import Slider
from django.conf import settings
from django.core.files.storage import default_storage
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.management import BaseCommand
from django.utils.timezone import now
from faker import Faker


class Command(BaseCommand):
    def handle(self, *args, **options):
        faker = Faker()
        i = 1

        img = "uploads/products/no_photo.jpg"
        if not default_storage.exists(img):
            img_path = os.path.join(BASE_DIR, "files/images") + "/no_photo.jpg"
            img = SimpleUploadedFile(
                name="no_photo.jpg",
                content=open(img_path, "rb").read(),
                content_type="image/jpeg",
            )

        for _ in range(2):
            name = faker.name()
            slider = Slider.objects.create(
                name=name,
                url=settings.APP_BASE_URL,
                title=faker.text(20),
                description=faker.text(50),
                image=img,
            )

            for _ in range(4):
                Slide.objects.create(
                    slider_id=slider.id,
                    url=settings.APP_BASE_URL,
                    title=faker.text(20),
                    subtitle=faker.text(20),
                    description=faker.text(50),
                    discount=10,
                    button_label=faker.text(10),
                    show_button=True,
                    date_start=now(),
                    date_end=now(),
                    order_position=i,
                    image=img,
                )
                i = i + 1

        self.stdout.write(self.style.SUCCESS("Success"))
