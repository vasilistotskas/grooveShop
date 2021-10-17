from django.contrib import admin
import admin_thumbnails
from .models import Category, Product, ProductImages, Favourite, Vat, Comment


def category_update_action(category):
    def category_update(modeladmin, request, queryset):
        return queryset.update(category=category)
    category_update.__name__ = 'make_action_%s' % category.name
    category_update.short_description = "Change category to '%s' for selected products" % category
    return category_update


@admin_thumbnails.thumbnail('image')
class ProductImageInline(admin.TabularInline):
    model = ProductImages
    exclude = ['thumbnail']
    readonly_fields = ('id',)
    extra = 1


class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}


class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'category', 'price', 'colored_stock', 'boolean_status', 'image_tag', 'likes_counter']
    search_fields = ['id', 'category__name', 'name']
    list_filter = ['category']
    inlines = [ProductImageInline]
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ('image_tag',)
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
    list_display = ['user', 'product']


admin.site.register(Category, CategoryAdmin)
admin.site.register(Vat)
admin.site.register(Comment)
admin.site.register(Product, ProductAdmin)
admin.site.register(Favourite, FavouriteAdmin)