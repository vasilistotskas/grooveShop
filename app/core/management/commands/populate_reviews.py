from django.core.management import BaseCommand
from faker import Faker
from random import randrange
from product.models import Category, Vat, Product, ProductImages, Favourite, Review


class Command(BaseCommand):
    def handle(self, *args, **options):
        faker = Faker()

        for _ in range(2000):
            rate = randrange(0, 10)
            user_id = randrange(1, 10)
            product_id = randrange(2, 400)
            obj, created = Review.objects.update_or_create(
                user_id=user_id,
                product_id=product_id,
                comment=faker.text(50),
                rate=rate,
                status='True',
                created_at=faker.date_time(),
                updated_at=faker.date_time()
            )
        self.stdout.write(self.style.SUCCESS('Success'))
