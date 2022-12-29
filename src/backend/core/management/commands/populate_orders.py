from random import randrange

from backend.order.models import Order
from backend.order.models import OrderItem
from django.core.management import BaseCommand
from django.utils.timezone import now
from faker import Faker


class Command(BaseCommand):
    def handle(self, *args, **options):
        faker = Faker()
        user_id = randrange(1, 10)

        for _ in range(30):
            order = Order.objects.create(
                user_id=user_id,
                first_name=faker.first_name(),
                last_name=faker.last_name(),
                email=faker.email(),
                address=faker.address(),
                zipcode=faker.zipcode(),
                place=faker.text(5),
                phone=faker.phone_number(),
                created_at=now(),
                paid_amount=10.0,
                stripe_token=faker.text(5),
            )

            product_id = randrange(1, 399)

            for _ in range(randrange(1, 5)):
                price = randrange(10, 100)
                quantity = randrange(1, 5)
                OrderItem.objects.create(
                    order_id=order.id,
                    product_id=product_id,
                    price=price,
                    quantity=quantity,
                )

        self.stdout.write(self.style.SUCCESS("Success"))
