import admin_thumbnails
from backend.product.models import Product
from backend.product.models import ProductImages
from backend.product.models import ProductTranslation
from django.contrib import admin


@admin_thumbnails.thumbnail("image")
class ProductImageInline(admin.TabularInline):
    model = ProductImages
    exclude = ["thumbnail"]
    readonly_fields = ("id",)
    extra = 1


class AppendActionException(BaseException):
    pass


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


@admin.register(ProductTranslation)
class ProductTranslationAdmin(admin.ModelAdmin):
    model = ProductTranslation
    list_display = (
        "product_id",
        "name",
        "description",
    )
    list_filter = (
        "product_id",
        "name",
    )
    list_editable = (
        "name",
        "description",
    )
    search_fields = (
        "product_id",
        "name",
    )
    date_hierarchy = "updated_at"
    save_on_top = True


admin.site.register(Product, ProductAdmin)
