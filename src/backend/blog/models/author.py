from backend.core.models import TimeStampMixinModel
from backend.core.models import UUIDModel
from django.db import models


class BlogAuthor(TimeStampMixinModel, UUIDModel):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField("user.UserAccount", on_delete=models.PROTECT)
    website = models.URLField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.user.email
