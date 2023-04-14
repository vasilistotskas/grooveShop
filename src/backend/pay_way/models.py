from backend.core.models import SortableModel
from backend.core.models import TimeStampMixinModel
from backend.core.models import UUIDModel
from backend.order.enum.pay_way_enum import PayWayEnum
from django.db import models
from django.db.models.query import QuerySet


class PayWay(TimeStampMixinModel, SortableModel, UUIDModel):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, choices=PayWayEnum.choices(), unique=True)
    active = models.BooleanField(default=True)
    cost = models.DecimalField(max_digits=11, decimal_places=2, default=0.0)
    free_for_order_amount = models.DecimalField(
        max_digits=11, decimal_places=2, default=0.0
    )

    class Meta:
        verbose_name_plural = "Payment Methods"

    def __str__(self):
        return self.name

    def get_ordering_queryset(self) -> QuerySet:
        return PayWay.objects.all()

    @classmethod
    def active_pay_ways_by_status(cls, status: bool) -> QuerySet:
        return cls.objects.filter(active=status).values()
