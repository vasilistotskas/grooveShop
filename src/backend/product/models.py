import os
import string
import random
from typing import Union
from decimal import Decimal
from django.db import models
from django.conf import settings
from mptt.models import MPTTModel
from tinymce.models import HTMLField
from mptt.fields import TreeForeignKey
from backend.seo.models import SeoModel
from django.db.models import Avg, Count
from django.utils.html import format_html
from backend.core.models import SortableModel
from django.utils.safestring import mark_safe
from backend.helpers.image_resize import make_thumbnail

User = settings.AUTH_USER_MODEL


def generate_unique_code():
    length = 11

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Product.objects.filter(product_code=code).count() == 0:
            break

    return code


class Category(MPTTModel):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(unique=True)
    description = HTMLField(null=True, blank=True)
    menu_image_one = models.ImageField(
        upload_to='uploads/categories/', null=True, blank=True)
    menu_image_two = models.ImageField(
        upload_to='uploads/categories/', null=True, blank=True)
    menu_main_banner = models.ImageField(
        upload_to='uploads/categories/', null=True, blank=True)
    parent = TreeForeignKey('self', blank=True, null=True, related_name='children', on_delete=models.CASCADE)
    tags = models.CharField(max_length=100, null=True,
                            blank=True, help_text='SEO keywords')

    def category_menu_image_one_absolute_url(self) -> str:
        try:
            if self.id is not None:
                image = settings.APP_BASE_URL + self.menu_image_one.url
            else:
                image = ""
            return image
        except:
            return ""

    def category_menu_image_one_filename(self) -> str:
        try:
            return os.path.basename(self.menu_image_one.name)
        except:
            return ""

    def category_menu_image_two_absolute_url(self) -> str:
        try:
            if self.id is not None:
                image = settings.APP_BASE_URL + self.menu_image_two.url
            else:
                image = ""
            return image
        except:
            return ""

    def category_menu_image_two_filename(self) -> str:
        try:
            return os.path.basename(self.menu_image_two.name)
        except:
            return ""

    def category_menu_main_banner_absolute_url(self) -> str:
        try:
            if self.id is not None:
                image = settings.APP_BASE_URL + self.menu_main_banner.url
            else:
                image = ""
            return image
        except:
            return ""

    def category_menu_main_banner_filename(self) -> str:
        try:
            return os.path.basename(self.menu_main_banner.name)
        except:
            return ""

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ('id',)

    class MPTTMeta:
        order_insertion_by = ['name']

    def __init__(self, *args, **kwargs):
        super(Category, self).__init__(*args, **kwargs)
        self.sub_categories_list = None

    def __str__(self):
        full_path = [self.name]
        k = self.parent
        while k is not None:
            full_path.append(k.name)
            k = k.parent
        return ' / '.join(full_path[::-1])

    def recursive_product_count(self) -> dict:
        return Product.objects.filter(category__in=self.get_descendants(include_self=True)).count()

    def absolute_url(self) -> str:
        return '/'.join([x['slug'] for x in self.get_ancestors(include_self=True).values()])


class Vat(models.Model):
    id = models.AutoField(primary_key=True)
    value = models.DecimalField(max_digits=11, decimal_places=1)

    def __str__(self):
        return '%s' % self.value


class Product(SeoModel):
    PRODUCT_STATUS = (
        ('True', 'Active'),
        ('False', 'Not Active'),
    )
    id = models.AutoField(primary_key=True)
    product_code = models.CharField(unique=True, max_length=100, default=generate_unique_code)
    category = TreeForeignKey('Category', on_delete=models.SET_NULL, related_name='products', null=True, blank=True)
    name = models.CharField(unique=True, max_length=255)
    slug = models.SlugField(unique=True)
    description = HTMLField(null=True, blank=True)
    price = models.DecimalField(max_digits=11, decimal_places=2, null=True)
    active = models.CharField(max_length=10, choices=PRODUCT_STATUS, default=True)
    stock = models.IntegerField(default=1)
    date_added = models.DateTimeField(auto_now_add=True)
    discount_percent = models.DecimalField(max_digits=11, decimal_places=2, default=0.0)
    vat = models.ForeignKey(Vat, related_name='vat', blank=True, null=True, on_delete=models.SET_NULL)
    hits = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ('-date_added',)

    def __str__(self) -> str:
        return self.name

    def likes_counter(self) -> int:
        favourites = Favourite.objects.filter(product=self).aggregate(count=Count('id'))
        cnt = 0
        if favourites["count"] is not None:
            cnt = int(favourites["count"])
        return cnt

    def review_average(self) -> int:
        reviews = Review.objects.filter(product=self, status='True').aggregate(average=Avg('rate'))
        avg = 0
        if reviews["average"] is not None:
            avg = float(reviews["average"])
        return avg

    def review_counter(self) -> int:
        reviews = Review.objects.filter(product=self, status='True').aggregate(count=Count('id'))
        cnt = 0
        if reviews["count"] is not None:
            cnt = int(reviews["count"])
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
        final_price = self.price - self.discount_value()
        product_save_value = self.price - final_price
        product_save_percent = (final_price * product_save_value) / self.price
        return product_save_percent

    def final_price(self) -> Decimal:
        return self.price - self.discount_value()

    def main_image_absolute_url(self) -> str:
        try:
            img = ProductImages.objects.get(product_id=self.id, is_main=True)
            if img.id is not None:
                image = settings.APP_BASE_URL + img.image.url
            else:
                image = ""
            return image
        except:
            return ""

    def main_image_filename(self) -> str:
        try:
            product_image = ProductImages.objects.get(product_id=self.id, is_main=True)
            return os.path.basename(product_image.image.name)
        except:
            return ""

    def image_tag(self) -> str:
        try:
            img = ProductImages.objects.get(product_id=self.id, is_main=True)
            if img.thumbnail:
                return mark_safe('<img src="{}"/>'.format(img.thumbnail.url))
            else:
                if img.image:
                    img.thumbnail = make_thumbnail(self.image, (100, 100))
                    img.save()
                    return mark_safe('<img src="{}"/>'.format(img.thumbnail.url))
                else:
                    return ''
        except:
            return ""

    def colored_stock(self) -> format_html:
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
        return f'/{self.category.slug}/{self.slug}'


class ProductImages(SortableModel):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50, blank=True)
    product = models.ForeignKey(Product, related_name="imageproduct", on_delete=models.CASCADE)
    image = models.ImageField(upload_to='uploads/products/', blank=True, null=True)
    thumbnail = models.ImageField(upload_to='uploads/products/thumbnails/', blank=True, null=True)
    is_main = models.BooleanField(blank=False, null=False, default=False)

    class Meta:
        verbose_name_plural = "Product Images"

    def __str__(self):
        return self.title

    def get_ordering_queryset(self):
        return self.product.imageproduct.all()

    def save(self, *args, **kwargs):
        if self.image:
            self.thumbnail = make_thumbnail(self.image, (100, 100))

        super().save(*args, **kwargs)

    def product_image_absolute_url(self) -> str:
        try:
            if self.id is not None:
                image = settings.APP_BASE_URL + self.image.url
            else:
                image = ""
            return image
        except:
            return ""

    def product_image_filename(self) -> str:
        try:
            return os.path.basename(self.image.name)
        except:
            return ""


# favourite Model
class Favourite(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.email

    def absolute_url(self):
        return f'//{self.id}/'


class Review(models.Model):
    STATUS = (
        ('New', 'New'),
        ('True', 'True'),
        ('False', 'False'),
    )
    RATE_CHOICES = (
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
        (5, 5),
        (6, 6),
        (7, 7),
        (8, 8),
        (9, 9),
        (10, 10)
    )
    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.CharField(max_length=250, blank=True)
    rate = models.PositiveSmallIntegerField(choices=RATE_CHOICES)
    status = models.CharField(max_length=10, choices=STATUS, default='True')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Reviews"
        ordering = ['-updated_at']

    def __str__(self):
        return self.comment
