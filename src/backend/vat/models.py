from backend.core.models import TimeStampMixinModel
from backend.core.models import UUIDModel
from django.db import models


class Vat(TimeStampMixinModel, UUIDModel):
    id = models.AutoField(primary_key=True)
    value = models.DecimalField(max_digits=11, decimal_places=1)

    def __str__(self):
        return "%s" % self.value

    @staticmethod
    def get_highest_vat_value():
        return Vat.objects.all().order_by("-value").first()
