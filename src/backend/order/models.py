from typing import Any

from backend.core.models import SortableModel
from backend.core.models import TimeStampMixinModel
from backend.core.models import UUIDModel
from backend.product.models import Product
from django.conf import settings
from django.db import models
from django.db.models.query import QuerySet

User = settings.AUTH_USER_MODEL


class PayWay(TimeStampMixinModel, SortableModel, UUIDModel):

    PAY_WAYS = (
        ("Credit Card", "Credit Card"),
        ("Pay On Delivery", "Pay On Delivery"),
        ("Pay On Store", "Pay On Store"),
        ("PayPal", "PayPal"),
    )

    PAY_WAY_STATUS = (
        ("True", "Active"),
        ("False", "Not Active"),
    )

    name = models.CharField(
        primary_key=True, max_length=50, choices=PAY_WAYS, unique=True
    )
    active = models.CharField(max_length=15, choices=PAY_WAY_STATUS, default=True)
    cost = models.DecimalField(max_digits=11, decimal_places=2, default=0.0)
    free_for_order_amount = models.DecimalField(
        max_digits=11, decimal_places=2, default=0.0
    )

    class Meta:
        verbose_name_plural = "Pay Ways"

    def __str__(self):
        return self.name

    def get_ordering_queryset(self):
        return PayWay.objects.all()

    @classmethod
    def active_pay_ways_by_status(cls, status: bool) -> QuerySet["Any"]:
        return cls.objects.filter(active=status).values()


class Order(TimeStampMixinModel, UUIDModel):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        User, related_name="orders", on_delete=models.CASCADE, null=True
    )
    pay_way = models.ForeignKey(
        PayWay, blank=True, null=True, related_name="orders", on_delete=models.SET_NULL
    )
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    zipcode = models.CharField(max_length=100)
    place = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    paid_amount = models.DecimalField(
        max_digits=8, decimal_places=2, blank=True, null=True
    )
    customer_notes = models.TextField(blank=True, null=True)
    stripe_token = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        ordering = [
            "-created_at",
        ]

    def __str__(self):
        return self.first_name


class OrderItem(TimeStampMixinModel, SortableModel, UUIDModel):
    id = models.AutoField(primary_key=True)
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name="items", on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return "%s" % self.id

    def get_ordering_queryset(self):
        return self.order.items.all()
