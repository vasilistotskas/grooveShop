from backend.core.models import TimeStampMixinModel
from backend.core.models import UUIDModel
from django.conf import settings
from django.db import models

User: str = settings.AUTH_USER_MODEL


class Favourite(TimeStampMixinModel, UUIDModel):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey("product.Product", on_delete=models.CASCADE)

    def __str__(self):
        return self.user.email

    def absolute_url(self):
        return f"//{self.id}/"
