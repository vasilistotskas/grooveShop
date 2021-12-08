from django.core.management import BaseCommand
from faker import Faker
from random import randrange
from order.models import Order, OrderItem


class Command(BaseCommand):
    def handle(self, *args, **options):
        faker = Faker()
        user_id = randrange(0, 10)

        for _ in range(3):
            order = Order.objects.create(
                user_id=user_id,
                first_name=faker.first_name(),
                last_name=faker.last_name(),
                email=faker.email(),
                address=faker.address(),
                zipcode=faker.zipcode(),
                place=faker.text(5),
                phone=faker.phone_number(),
                created_at=faker.date_time(),
                paid_amount=10.0,
                stripe_token=faker.text(5)
            )

            for _ in range(randrange(1, 5)):
                price = randrange(10, 100)
                quantity = randrange(1, 5)
                OrderItem.objects.create(
                    order_id=order.id,
                    product_id=1,
                    price=price,
                    quantity=quantity,
                )

        self.stdout.write(self.style.SUCCESS('Success'))