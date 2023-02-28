from decimal import Decimal

from backend.core.models import SortableModel
from backend.core.models import TimeStampMixinModel
from backend.core.models import UUIDModel
from django.db import models
from django.db.models import QuerySet


class Order(TimeStampMixinModel, UUIDModel):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        "user.UserAccount",
        related_name="order_user",
        on_delete=models.CASCADE,
        null=True,
    )
    pay_way = models.ForeignKey(
        "pay_way.PayWay",
        related_name="order_pay_way",
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
    )
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    zipcode = models.CharField(max_length=100)
    place = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    paid_amount = models.DecimalField(max_digits=8, decimal_places=2)
    customer_notes = models.TextField(blank=True, null=True)
    stripe_token = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        ordering = [
            "-created_at",
        ]

    def __str__(self):
        return self.first_name

    @property
    def get_total_price(self) -> Decimal:
        return sum(item.get_total_price for item in self.order_item_order.all())


class OrderItem(TimeStampMixinModel, SortableModel, UUIDModel):
    id = models.AutoField(primary_key=True)
    order = models.ForeignKey(
        "order.Order", related_name="order_item_order", on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        "product.Product", related_name="order_item_product", on_delete=models.CASCADE
    )
    price = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return "%s" % self.id

    @property
    def get_total_price(self) -> Decimal:
        return self.price * self.quantity

    def get_ordering_queryset(self) -> QuerySet:
        return self.order.order_item_order.all()
