from django.contrib import admin
import admin_thumbnails
from .models import Category, Product, ProductImages, Favourite, Vat, Review
from django.utils.translation import ngettext
from django.contrib import messages


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


class ReviewAdmin(admin.ModelAdmin):
    list_display = ['subject', 'comment', 'status', 'created_at']
    list_filter = ['status']
    actions = ['make_published', 'make_unpublished']

    def make_published(self, request, queryset):
        updated = queryset.update(status='True')
        self.message_user(request, ngettext(
            '%d comment was successfully marked as published.',
            '%d comments were successfully marked as published.',
            updated,
        ) % updated, messages.SUCCESS)

    def make_unpublished(self, request, queryset):
        updated = queryset.update(status='False')
        self.message_user(request, ngettext(
            '%d comment was successfully marked as published.',
            '%d comments were successfully marked as published.',
            updated,
        ) % updated, messages.SUCCESS)

    make_published.short_description = "Mark selected comments as published"
    make_unpublished.short_description = "Mark selected comments as unpublished"


admin.site.register(Category, CategoryAdmin)
admin.site.register(Vat)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Favourite, FavouriteAdmin)