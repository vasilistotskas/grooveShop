from typing import List

from backend.core.models import PublishableModel
from backend.core.models import TimeStampMixinModel
from backend.core.models import UUIDModel
from django.conf import settings
from django.db import models

User: str = settings.AUTH_USER_MODEL


class Review(TimeStampMixinModel, PublishableModel, UUIDModel):
    STATUS = (
        ("New", "New"),
        ("True", "True"),
        ("False", "False"),
    )
    RATE_CHOICES = (
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
        (5, 5),
        (6, 6),
        (7, 7),
        (8, 8),
        (9, 9),
        (10, 10),
    )
    id = models.AutoField(primary_key=True)
    product = models.ForeignKey("product.Product", on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.CharField(max_length=250, blank=True)
    rate = models.PositiveSmallIntegerField(choices=RATE_CHOICES)
    status = models.CharField(max_length=10, choices=STATUS, default="True")

    class Meta:
        verbose_name_plural = "Reviews"
        ordering: List[str] = ["-updated_at"]

    def __str__(self):
        return self.comment
