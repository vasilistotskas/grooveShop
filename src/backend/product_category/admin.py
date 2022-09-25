from backend.product.models import Product
from backend.product_category.models import Category
from django.contrib import admin
from mptt.admin import DraggableMPTTAdmin


def category_update_action(category):
    def category_update(modeladmin, request, queryset):
        return queryset.update(category=category)

    category_update.__name__ = "make_action_%s" % category.name
    category_update.short_description = (
        "Change category to '%s' for selected products" % category
    )
    return category_update


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


admin.site.register(Category, CategoryAdmin)
