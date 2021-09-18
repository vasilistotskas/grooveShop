from django.contrib import admin

from .models import Category, Product, Favourite, FavouriteItem

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Favourite)
admin.site.register(FavouriteItem)