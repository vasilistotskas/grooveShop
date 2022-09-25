import admin_thumbnails
from django.contrib import admin
from django.contrib import messages
from django.utils.translation import ngettext
from mptt.admin import DraggableMPTTAdmin

from .models import Category
from .models import Favourite
from .models import Product
from .models import ProductImages
from .models import Review
from .models import Vat


def category_update_action(category):
    def category_update(modeladmin, request, queryset):
        return queryset.update(category=category)

    category_update.__name__ = "make_action_%s" % category.name
    category_update.short_description = (
        "Change category to '%s' for selected products" % category
    )
    return category_update


@admin_thumbnails.thumbnail("image")
class ProductImageInline(admin.TabularInline):
    model = ProductImages
    exclude = ["thumbnail"]
    readonly_fields = ("id",)
    extra = 1


class CategoryAdmin(DraggableMPTTAdmin):
    mptt_indent_field = "name"
    list_display = (
        "tree_actions",
        "indented_title",
        "related_products_count",
        "related_products_cumulative_count",
    )
    list_display_links = ("indented_title",)
    prepopulated_fields = {"slug": ("name",)}

    def get_queryset(self, request):
        qs = super().get_queryset(request)

        # Add cumulative product count
        qs = Category.objects.add_related_count(
            qs, Product, "category", "products_cumulative_count", cumulative=True
        )

        # Add non cumulative product count
        qs = Category.objects.add_related_count(
            qs, Product, "category", "products_count", cumulative=False
        )
        return qs

    def related_products_count(self, instance):
        return instance.products_count

    setattr(
        related_products_count,
        "short_description",
        "Related products (for this specific category)",
    )

    def related_products_cumulative_count(self, instance):
        return instance.products_cumulative_count

    setattr(
        related_products_cumulative_count,
        "short_description",
        "Related products (in tree)",
    )


class ProductAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "name",
        "category",
        "price",
        "colored_stock",
        "boolean_status",
        "image_tag",
        "likes_counter",
    ]
    search_fields = ["id", "category__name", "name", "product_code"]
    list_filter = ["category"]
    inlines = [ProductImageInline]
    prepopulated_fields = {"slug": ("name",)}
    readonly_fields = ("image_tag",)
    actions = [""]
    # List with actions for mass category set to products
    try:
        for s in Category.objects.all():
            actions.append(category_update_action(s))
    except:
        pass

    def boolean_status(self, obj):
        return obj.active == "True"

    setattr(
        boolean_status,
        "boolean",
        True,
    )

    setattr(
        boolean_status,
        "short_description",
        "STATUS",
    )


class FavouriteAdmin(admin.ModelAdmin):
    list_display = ["user", "product"]


class ReviewAdmin(admin.ModelAdmin):
    list_display = ["comment", "status", "created_at"]
    list_filter = ["status"]
    actions = ["make_published", "make_unpublished"]

    def make_published(self, request, queryset):
        updated = queryset.update(status="True")
        self.message_user(
            request,
            ngettext(
                "%d comment was successfully marked as published.",
                "%d comments were successfully marked as published.",
                updated,
            )
            % updated,
            messages.SUCCESS,
        )

    def make_unpublished(self, request, queryset):
        updated = queryset.update(status="False")
        self.message_user(
            request,
            ngettext(
                "%d comment was successfully marked as published.",
                "%d comments were successfully marked as published.",
                updated,
            )
            % updated,
            messages.SUCCESS,
        )

    setattr(
        make_published,
        "short_description",
        "Mark selected comments as published",
    )

    setattr(
        make_unpublished,
        "short_description",
        "Mark selected comments as unpublished",
    )


admin.site.register(Category, CategoryAdmin)
admin.site.register(Vat)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Favourite, FavouriteAdmin)
