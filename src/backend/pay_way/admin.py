from backend.pay_way.models import PayWay
from django.contrib import admin


class PayWayAdmin(admin.ModelAdmin):
    list_display = ["name", "active", "cost", "free_for_order_amount"]


admin.site.register(PayWay, PayWayAdmin)
