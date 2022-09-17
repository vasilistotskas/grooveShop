from django.contrib import admin

from .models import Order
from .models import OrderItem
from .models import PayWay


class OrderItemline(admin.TabularInline):
    model = OrderItem
    readonly_fields = ("product", "price", "quantity")
    can_delete = False
    extra = 0


class OrderAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "first_name",
        "last_name",
        "email",
        "address",
        "zipcode",
        "place",
        "phone",
        "created_at",
        "paid_amount",
    ]
    list_filter = ["email"]
    readonly_fields = (
        "user",
        "first_name",
        "last_name",
        "email",
        "address",
        "zipcode",
        "place",
        "phone",
        "created_at",
        "paid_amount",
        "customer_notes",
        "city",
    )
    can_delete = False
    inlines = [OrderItemline]


class OrderItemAdmin(admin.ModelAdmin):
    list_display = ["order", "product", "price", "quantity"]
    list_filter = ["order"]


class PayWayAdmin(admin.ModelAdmin):
    list_display = ["name", "active", "cost", "free_for_order_amount"]


admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(PayWay, PayWayAdmin)
