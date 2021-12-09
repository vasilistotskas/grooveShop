from django.core.management import BaseCommand
from faker import Faker
from random import randrange
from product.models import Category, Vat, Product, ProductImages, Favourite, Review


class Command(BaseCommand):
    def handle(self, *args, **options):
        faker = Faker()
        user_id = randrange(1, 10)
        i = 1

        for _ in range(3):
            vat = randrange(0, 100)
            Vat.objects.create(
                value=vat
            )

        for _ in range(2):
            name = faker.name()
            category = Category.objects.create(
                name=name,
                slug=name,
                description=faker.text(5),
                image_url='uploads/products/1_jM4xRzn.jpg',
            )

            for _ in range(24):
                product_price = randrange(20, 300)
                name = 'testproduct' + str(i)
                product = Product.objects.create(
                    category_id=category.id,
                    name=name,
                    slug=name,
                    description=faker.text(10),
                    price=product_price,
                    active='True',
                    stock=100,
                    date_added=faker.date_time(),
                    vat_id=1
                )
                i = i + 1

                product_images = ProductImages.objects.create(
                    title=faker.text(5),
                    product_id=product.id,
                    image='uploads/products/1_jM4xRzn.jpg',
                    thumbnail='uploads/products/thumbnails/1_p66QWaF.jpg',
                    is_main=True
                )

                for _ in range(2):
                    favourite = Favourite.objects.create(
                        user_id=user_id,
                        product_id=product.id
                    )

                for _ in range(4):
                    rate = randrange(0, 10)
                    review = Review.objects.create(
                        user_id=user_id,
                        product_id=product.id,
                        comment=faker.text(5),
                        rate=rate,
                        status='True',
                        created_at=faker.date_time(),
                        updated_at=faker.date_time()
                    )
        self.stdout.write(self.style.SUCCESS('Success'))
