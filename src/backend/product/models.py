import os
import random
import string
from decimal import Decimal
from typing import Union

from backend.core.models import SortableModel
from backend.core.models import TimeStampMixinModel
from backend.core.models import UUIDModel
from backend.helpers.image_resize import make_thumbnail
from backend.product_favourite.models import Favourite
from backend.product_review.models import Review
from backend.seo.models import SeoModel
from backend.seo.models import SeoModelTranslation
from backend.vat.models import Vat
from django.conf import settings
from django.db import models
from django.db.models import Avg
from django.db.models import Count
from django.db.models.fields.files import ImageFieldFile
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from django.utils.safestring import SafeString
from mptt.fields import TreeForeignKey
from tinymce.models import HTMLField

User: str = settings.AUTH_USER_MODEL


def generate_unique_code():
    length: int = 11

    while True:
        code: str = "".join(random.choices(string.ascii_uppercase, k=length))
        if Product.objects.filter(product_code=code).count() == 0:
            break

    return code


class Product(TimeStampMixinModel, SeoModel, UUIDModel):
    PRODUCT_STATUS = (
        ("True", "Active"),
        ("False", "Not Active"),
    )
    id = models.AutoField(primary_key=True)
    product_code = models.CharField(
        unique=True, max_length=100, default=generate_unique_code
    )
    category = TreeForeignKey(
        "product_category.Category",
        on_delete=models.SET_NULL,
        related_name="products",
        null=True,
        blank=True,
    )
    name = models.CharField(unique=True, max_length=255)
    slug = models.SlugField(unique=True)
    description = HTMLField(null=True, blank=True)
    price = models.DecimalField(max_digits=11, decimal_places=2, null=True)
    active = models.CharField(max_length=10, choices=PRODUCT_STATUS, default=True)
    stock = models.IntegerField(default=1)
    discount_percent = models.DecimalField(max_digits=11, decimal_places=2, default=0.0)
    vat = models.ForeignKey(
        Vat, related_name="vat", blank=True, null=True, on_delete=models.SET_NULL
    )
    hits = models.PositiveIntegerField(default=0)

    class Meta:
        ordering: tuple[str] = ("-created_at",)

    def __str__(self) -> str:
        return self.name

    def likes_counter(self) -> int:
        favourites = Favourite.objects.filter(product=self).aggregate(count=Count("id"))
        cnt: int = 0
        if favourites["count"] is not None:
            cnt = int(favourites["count"])
        return cnt

    def review_average(self) -> float:
        reviews = Review.objects.filter(product=self, status="True").aggregate(
            average=Avg("rate")
        )
        avg: float = 0.0
        if reviews["average"] is not None:
            avg = float(reviews["average"])
        return avg

    def review_counter(self) -> int:
        reviews = Review.objects.filter(product=self, status="True").aggregate(
            count=Count("id")
        )
        cnt: int = 0
        if reviews["count"] is not None:
            return int(reviews["count"])
        return cnt

    def vat_percent(self) -> Union[Decimal, int]:
        if self.vat:
            return self.vat.value
        return 0

    def vat_value(self) -> Union[Decimal, int]:
        if self.vat:
            return (self.price * self.vat.value) / 100
        return 0

    def discount_value(self) -> Decimal:
        return (self.price * self.discount_percent) / 100

    def price_save_percent(self) -> Decimal:
        final_price: Decimal = self.price - self.discount_value()
        product_save_value: Decimal = self.price - final_price
        product_save_percent: Decimal = (final_price * product_save_value) / self.price
        return product_save_percent

    def final_price(self) -> Decimal:
        return self.price - self.discount_value()

    def main_image_absolute_url(self) -> str:
        img = ProductImages.objects.get(product_id=self.id, is_main=True)
        image: str = ""
        if img.image:
            return settings.BACKEND_BASE_URL + img.image.url
        return image

    def main_image_filename(self) -> str:
        product_image = ProductImages.objects.get(product_id=self.id, is_main=True)
        return os.path.basename(product_image.image.name)

    def image_tag(self) -> str:
        img = ProductImages.objects.get(product_id=self.id, is_main=True)
        if img.thumbnail:
            return mark_safe('<img src="{}"/>'.format(img.thumbnail.url))
        else:
            if img.image:
                img.thumbnail = make_thumbnail(img.image, (100, 100))
                img.save()
                return mark_safe('<img src="{}"/>'.format(img.thumbnail.url))
            else:
                return ""

    def colored_stock(self) -> Union[SafeString, SafeString]:
        if self.stock > 0:
            return format_html(
                '<span style="color: #1bff00;">{}</span>',
                self.stock,
            )
        else:
            return format_html(
                '<span style="color: #ff0000;">{}</span>',
                self.stock,
            )

    def absolute_url(self) -> str:
        return f"/{self.category.slug}/{self.slug}"


class ProductTranslation(TimeStampMixinModel, UUIDModel, SeoModelTranslation):
    product = models.ForeignKey(
        Product, related_name="translations", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=250, blank=True, null=True)
    description = HTMLField(null=True, blank=True)

    class Meta:
        unique_together = (("language_code", "product"),)

    def __str__(self) -> str:
        return self.name if self.name else str(self.pk)

    def __repr__(self) -> str:
        class_ = type(self)
        return "%s(pk=%r, name=%r, product_pk=%r)" % (
            class_.__name__,
            self.pk,
            self.name,
            self.product_id,
        )

    def get_translated_object_id(self):
        return "Product", self.product_id

    def get_translated_keys(self):
        translated_keys = super().get_translated_keys()
        translated_keys.update(
            {
                "name": self.name,
                "description": self.description,
            }
        )
        return translated_keys


class ProductImages(TimeStampMixinModel, SortableModel, UUIDModel):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50, blank=True)
    product = models.ForeignKey(
        Product, related_name="imageproduct", on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to="uploads/products/", blank=True, null=True)
    thumbnail = models.ImageField(
        upload_to="uploads/products/thumbnails/", blank=True, null=True
    )
    is_main = models.BooleanField(blank=False, null=False, default=False)

    class Meta:
        verbose_name_plural = "Product Images"

    def __str__(self):
        return self.title

    def get_ordering_queryset(self):
        return self.product.imageproduct.all()

    def save(self, *args, **kwargs):
        image: ImageFieldFile = self.image
        if image:
            self.thumbnail = make_thumbnail(image, (100, 100))

        super().save(*args, **kwargs)

    @property
    def product_image_absolute_url(self) -> str:
        image: str = ""
        if self.image:
            return settings.BACKEND_BASE_URL + self.image.url
        return image

    def product_image_filename(self) -> str:
        if self.image:
            return os.path.basename(self.image.name)
        else:
            return ""
