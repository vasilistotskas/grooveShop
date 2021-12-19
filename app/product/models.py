from django.db import models
from mptt.models import MPTTModel
from mptt.fields import TreeForeignKey
from django.db.models import Avg, Count
from django.utils.html import format_html
from django.contrib.auth.models import User
from django.utils.safestring import mark_safe
from helpers.image_resize import make_thumbnail


class Category(MPTTModel):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(unique=True)
    description = models.TextField(null=True, blank=True)
    menu_image_one = models.ImageField(
        upload_to='uploads/categories/', null=True, blank=True)
    menu_image_two = models.ImageField(
        upload_to='uploads/categories/', null=True, blank=True)
    menu_main_banner = models.ImageField(
        upload_to='uploads/categories/', null=True, blank=True)
    parent = TreeForeignKey('self', blank=True, null=True, related_name='children', on_delete=models.CASCADE)
    tags = models.CharField(max_length=100, null=True,
                            blank=True, help_text='SEO keywords')

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

    def recursive_product_count(self):
        return Product.objects.filter(category__in=self.get_descendants(include_self=True)).count()

    def absolute_url(self):
        return '/'.join([x['slug'] for x in self.get_ancestors(include_self=True).values()])


class Vat(models.Model):
    id = models.AutoField(primary_key=True)
    value = models.DecimalField(max_digits=11, decimal_places=1)

    def __str__(self):
        return '%s' % self.value


class Product(models.Model):

    PRODUCT_STATUS = (
        ('True', 'Active'),
        ('False', 'Not Active'),
    )
    id = models.AutoField(primary_key=True)
    category = TreeForeignKey('Category', on_delete=models.SET_NULL, related_name='products', null=True, blank=True)
    name = models.CharField(max_length=255)
    slug = models.SlugField()
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=11, decimal_places=2, null=True)
    active = models.CharField(max_length=10, choices=PRODUCT_STATUS, default=True)
    stock = models.IntegerField(default=1)
    date_added = models.DateTimeField(auto_now_add=True)
    discount_percent = models.DecimalField(max_digits=11, decimal_places=2, default=0.0)
    vat = models.ForeignKey(Vat, related_name='vat', blank=True, null=True, on_delete=models.SET_NULL)
    hits = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ('-date_added',)

    def __str__(self):
        return self.name

    def likes_counter(self):
        favourites = Favourite.objects.filter(product=self).aggregate(count=Count('id'))
        cnt = 0
        if favourites["count"] is not None:
            cnt = int(favourites["count"])
        return cnt

    def review_average(self):
        reviews = Review.objects.filter(product=self, status='True').aggregate(average=Avg('rate'))
        avg = 0
        if reviews["average"] is not None:
            avg = float(reviews["average"])
        return avg

    def review_counter(self):
        reviews = Review.objects.filter(product=self, status='True').aggregate(count=Count('id'))
        cnt = 0
        if reviews["count"] is not None:
            cnt = int(reviews["count"])
        return cnt

    def vat_percent(self):
        if self.vat:
            return self.vat.value
        return 0

    def vat_value(self):
        if self.vat:
            return (self.price * self.vat.value) / 100
        return 0

    def discount_value(self):
        return (self.price * self.discount_percent) / 100

    def final_price(self):
        return self.price - self.discount_value()

    def main_image(self):
        try:
            img = ProductImages.objects.get(product_id=self.id, is_main=True)
            if img.id is not None:
                image = 'http://localhost:8000' + img.image.url
            else:
                image = ""
            return image
        except:
            return ""

    def image_tag(self):
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

    def colored_stock(self):
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

    def absolute_url(self):
        return f'/{self.category.slug}/{self.slug}'


class ProductImages(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='uploads/products/', blank=True, null=True)
    thumbnail = models.ImageField(upload_to='uploads/products/thumbnails/', blank=True, null=True)
    is_main = models.BooleanField(blank=False, null=False, default=False)

    class Meta:
        verbose_name_plural = "Product Images"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.image:
            self.thumbnail = make_thumbnail(self.image, (100, 100))

        super().save(*args, **kwargs)

    @classmethod
    def find_product_images(cls, product_id):
        return cls.objects.filter(product_id=product_id,  main_picture=False)

    @classmethod
    def find_main_product_image(cls, product_id):
        return cls.objects.get(product_id=product_id, main_picture=True)

    @classmethod
    def find_all_product_images(cls, product_id):
        return cls.objects.filter(product_id=product_id)


# favourite Model
class Favourite(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

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

    def __str__(self):
        return self.comment