from io import BytesIO
from PIL import Image
from django.core.files import File
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.html import format_html
from django.utils.safestring import mark_safe


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


class Product(models.Model):

    PRODUCT_STATUS = (
        ('True', 'Active'),
        ('False', 'Not Active'),
    )

    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    slug = models.SlugField()
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    active = models.CharField(max_length=10, choices=PRODUCT_STATUS, default=True)
    quantity = models.IntegerField(default=1)
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-date_added',)

    def __str__(self):
        return self.name

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
                    img.thumbnail = img.make_thumbnail(self.image)
                    img.save()
                    return mark_safe('<img src="{}"/>'.format(img.thumbnail.url))
                else:
                    return ''
        except:
            return ""

    def colored_quantity(self):
        if self.quantity > 0:
            return format_html(
                '<span style="color: #1bff00;">{}</span>',
                self.quantity,
            )
        else:
            return format_html(
                '<span style="color: #ff0000;">{}</span>',
                self.quantity,
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
        self.thumbnail = self.make_thumbnail(self.image)

        super().save(*args, **kwargs)

    def make_thumbnail(self, image, size=(200, 200)):
        img = Image.open(image)
        img.convert('RGB')
        img.thumbnail(size)

        thumb_io = BytesIO()
        img.save(thumb_io, 'JPEG', quality=100)

        thumbnail = File(thumb_io, name=image.name)
        return thumbnail

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
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

    def get_absolute_url(self):
        return f'//{self.id}/'

    def get_items(self):
        return self.favourite_items.prefetch_related('product').all()

    # use Django signals to create user favourite on user creation
    @receiver(post_save, sender=User)
    def create_user_favourite(sender, instance, created, **kwargs):
        if created:
            Favourite.objects.create(user=instance)


# Add To favourite Model
class FavouriteItem(models.Model):
    favourite = models.ForeignKey(Favourite, related_name='favourite_items', on_delete=models.CASCADE)
    product = models.OneToOneField(Product, related_name='favourite_items', on_delete=models.CASCADE)
    is_favourite = models.BooleanField(default=False)

    def __str__(self):
        return '%s' % self.id

    def get_favourite(self):
        return ",".join([str(p) for p in self.favourite.all()])