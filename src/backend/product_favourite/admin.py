from backend.product_favourite.models import Favourite
from django.contrib import admin


class FavouriteAdmin(admin.ModelAdmin):
    list_display = ["user", "product"]


admin.site.register(Favourite, FavouriteAdmin)
