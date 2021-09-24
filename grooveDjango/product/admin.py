from django.contrib import admin

from .models import Category, Product, Favourite, FavouriteItem


def category_update_action(category):
    def category_update(modeladmin, request, queryset):
        return queryset.update(category=category)
    category_update.__name__ = 'make_action_%s' % category.name
    category_update.short_description = "Change category to '%s' for selected products" % category
    return category_update


class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'boolean_status']
    list_filter = ['category']
    inlines = []
    prepopulated_fields = {'slug': ('name',)}
    actions = ['']
    # List with actions for mass category set to products
    try:
        for s in Category.objects.all():
            actions.append(category_update_action(s))
    except:
        pass

    # Product status has Choices , this method returns boolean and displays the mini icon at admin panel
    def boolean_status(self, obj):
        return obj.active == 'True'

    boolean_status.boolean = True
    boolean_status.short_description = u"STATUS"


class FavouriteAdmin(admin.ModelAdmin):
    list_display = ['user']


class FavouriteItemAdmin(admin.ModelAdmin):
    list_display = ['favourite_id', 'product']


admin.site.register(Category)
admin.site.register(Product, ProductAdmin)
admin.site.register(Favourite, FavouriteAdmin)
admin.site.register(FavouriteItem, FavouriteItemAdmin)