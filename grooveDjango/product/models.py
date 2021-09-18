from io import BytesIO
from PIL import Image
from django.core.files import File
from django.db import models


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
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    slug = models.SlugField()
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to='uploads/', blank=True, null=True)
    thumbnail = models.ImageField(upload_to='uploads/', blank=True, null=True)
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-date_added',)
    
    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return f'/{self.category.slug}/{self.slug}/'
    
    def get_image(self):
        if self.image:
            return 'http://127.0.0.1:8000' + self.image.url
        return ''
    
    def get_thumbnail(self):
        if self.thumbnail:
            return 'http://127.0.0.1:8000' + self.thumbnail.url
        else:
            if self.image:
                self.thumbnail = self.make_thumbnail(self.image)
                self.save()

                return 'http://127.0.0.1:8000' + self.thumbnail.url
            else:
                return ''
    
    def make_thumbnail(self, image, size=(300, 200)):
        img = Image.open(image)
        img.convert('RGB')
        img.thumbnail(size)

        thumb_io = BytesIO()
        img.save(thumb_io, 'JPEG', quality=85)

        thumbnail = File(thumb_io, name=image.name)

        return thumbnail