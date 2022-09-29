import os

from backend.core.models import TimeStampMixinModel
from backend.tip.validators import validate_file_extension
from django.conf import settings
from django.db import models
from django.db.models import FileField
from django.utils.safestring import mark_safe


class Tip(TimeStampMixinModel):
    TIP_KINDS = (
        ("success", "success"),
        ("info", "info"),
        ("error", "error"),
        ("warning", "warning"),
    )
    title = models.CharField(max_length=200)
    content = models.TextField(max_length=1000)
    kind = models.CharField(max_length=10, choices=TIP_KINDS, default=True)
    icon = models.FileField(
        upload_to="uploads/tip/", validators=[validate_file_extension]
    )
    url = models.CharField(max_length=200)
    active = models.BooleanField(default=True)

    class Meta:
        ordering: list[str] = ["-created_at"]

    def image_tag(self):
        icon: FileField = self.icon
        if icon:
            return mark_safe('<img src="{}" height="50"/>'.format(icon.url))
        return ""

    @property
    def main_image_absolute_url(self) -> str:
        icon: str = ""
        if self.icon:
            return settings.BACKEND_BASE_URL + self.icon.url
        return icon

    @property
    def main_image_filename(self) -> str:
        if self.icon:
            return os.path.basename(self.icon.name)
        else:
            return ""
