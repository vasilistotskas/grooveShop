from backend.core.models import PublishableModel
from backend.core.models import TimeStampMixinModel
from backend.core.models import UUIDModel
from backend.product.enum.review import RateChoicesEnum
from backend.product.enum.review import StatusEnum
from django.db import models


class ProductReview(TimeStampMixinModel, PublishableModel, UUIDModel):
    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(
        "product.Product",
        related_name="product_review_product",
        on_delete=models.CASCADE,
    )
    user = models.ForeignKey(
        "user.UserAccount", related_name="product_review_user", on_delete=models.CASCADE
    )
    comment = models.CharField(max_length=250, blank=True)
    rate = models.PositiveSmallIntegerField(choices=RateChoicesEnum.choices())
    status = models.CharField(
        max_length=10, choices=StatusEnum.choices(), default=StatusEnum.NEW
    )

    class Meta:
        verbose_name_plural = "Product Reviews"
        unique_together = (("product", "user"),)
        ordering = ["-updated_at"]

    def __str__(self):
        return self.comment
