from django.contrib import admin

from .models import Order, OrderItem


class OrderItemline(admin.TabularInline):
    model = OrderItem
    readonly_fields = ('product', 'price', 'quantity')
    can_delete = False
    extra = 0


class OrderAdmin(admin.ModelAdmin):
    list_display = ['user', 'first_name', 'last_name', 'email', 'address', 'zipcode', 'place', 'phone', 'created_at', 'paid_amount']
    list_filter = ['email']
    readonly_fields = (
        'user', 'first_name', 'last_name', 'email', 'address', 'zipcode', 'place', 'phone',
        'created_at', 'paid_amount')
    can_delete = False
    inlines = [OrderItemline]


class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'product', 'price', 'quantity']
    list_filter = ['order']


admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)