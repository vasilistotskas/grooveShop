from backend.core.models import TimeStampMixinModel
from backend.core.models import UUIDModel
from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL


class BlogAuthor(TimeStampMixinModel, UUIDModel):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.PROTECT)
    website = models.URLField(blank=True, null=True)
    bio = models.CharField(max_length=240, blank=True, null=True)

    def __str__(self):
        return self.user.email
