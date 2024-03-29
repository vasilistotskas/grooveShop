from backend.order.models import Order
from backend.order.models import OrderItem
from django.contrib import admin


class OrderItemLine(admin.TabularInline):
    model = OrderItem
    readonly_fields = ("price", "quantity")
    can_delete = False
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "first_name",
        "last_name",
        "email",
        "zipcode",
        "place",
        "phone",
        "created_at",
        "paid_amount",
    ]
    list_filter = ["email"]
    search_fields = ["email"]
    readonly_fields = (
        "first_name",
        "last_name",
        "email",
        "zipcode",
        "place",
        "phone",
        "created_at",
        "paid_amount",
        "customer_notes",
        "city",
    )
    can_delete = False
    inlines = [OrderItemLine]


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ["order", "product", "price", "quantity"]
    list_filter = ["order"]
