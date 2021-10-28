from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from django.db.models import Avg, Count
from helpers.image_resize import make_thumbnail


class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField()
    description = models.TextField(null=True, blank=True)
    image_url = models.ImageField(
        upload_to='images/categories', null=True, blank=True)
    parent = models.ForeignKey(
        'self', related_name='sub_categories', null=True, blank=True, on_delete=models.CASCADE)
    tags = models.CharField(max_length=100, null=True,
                            blank=True, help_text='SEO keywords')
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ('display_order', 'id',)

    def __init__(self, *args, **kwargs):
        super(Category, self).__init__(*args, **kwargs)
        self.sub_categories_list = None

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return f'/{self.slug}/'

    @classmethod
    def get_all_categories(cls):
        return cls.objects.filter(is_active=True)

    @classmethod
    def update_sub_category_lists(cls):
        all_categories = cls.get_all_categories()
        for single_category in all_categories:
            sub_categories = []
            for one_category in all_categories:
                if one_category.parent_id == single_category.id:
                    sub_categories.append(one_category)
            single_category.sub_categories_list = sub_categories
        return all_categories

    @staticmethod
    def find_main_categories(categories):
        # find value of lowest display order
        min_display_order = 324234
        for category in categories:
            if category.display_order < min_display_order:
                min_display_order = category.display_order
        # find and then return main categories
        main_categories = []
        for category in categories:
            if category.display_order == min_display_order:
                main_categories.append(category)
        return main_categories

    # maybe refactor this abomination later?
    def get_all_sub_categories(self):
        all_categories = self.update_sub_category_lists()
        for cat in all_categories:
            if cat.id == self.id:
                category = cat
                break

        def traverse_tree(category):
            if category.sub_categories_list != None:
                for sub_category in category.sub_categories_list:
                    traverse_tree(sub_category)
                    yield sub_category
        generator_with_sub_categories = traverse_tree(category)

        list_of_all_sub_categories = []
        for x in generator_with_sub_categories:
            list_of_all_sub_categories.append(x)
        return list_of_all_sub_categories


class Vat(models.Model):
    value = models.DecimalField(max_digits=11, decimal_places=1)

    def __str__(self):
        return '%s' % self.value


class Product(models.Model):

    PRODUCT_STATUS = (
        ('True', 'Active'),
        ('False', 'Not Active'),
    )

    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
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

    def review_avarage(self):
        reviews = Review.objects.filter(product=self, status='True').aggregate(avarage=Avg('rate'))
        avg = 0
        if reviews["avarage"] is not None:
            avg = float(reviews["avarage"])
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
                image = 'http://127.0.0.1:8000' + img.image.url
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

    def get_absolute_url(self):
        return f'/{self.category.slug}/{self.slug}/{self.id}'


class ProductImages(models.Model):
    title = models.CharField(max_length=50, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='uploads/', blank=True, null=True)
    thumbnail = models.ImageField(upload_to='uploads/', blank=True, null=True)
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
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

    def get_absolute_url(self):
        return f'//{self.id}/'


class Review(models.Model):
    STATUS = (
        ('New', 'New'),
        ('True', 'True'),
        ('False', 'False'),
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    subject = models.CharField(max_length=50, blank=True)
    comment = models.CharField(max_length=250, blank=True)
    rate = models.IntegerField(default=1)
    status = models.CharField(max_length=10, choices=STATUS, default='New')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Reviews"

    def __str__(self):
        return self.subject