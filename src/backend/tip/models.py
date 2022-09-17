import os

from backend.tip.validators import validate_file_extension
from django.conf import settings
from django.db import models
from django.utils.safestring import mark_safe


class Tip(models.Model):
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
    created_at = models.DateField(auto_now_add=True)
    active = models.BooleanField(default=True)

    class Meta:
        ordering = ["-created_at"]

    def image_tag(self):
        icon = self.icon
        if icon:
            return mark_safe('<img src="{}" height="50"/>'.format(icon.url))
        return ""

    @property
    def main_image_absolute_url(self) -> str:
        if self.icon:
            icon = settings.BACKEND_BASE_URL + self.icon.url
        else:
            icon = ""
        return icon

    @property
    def main_image_filename(self) -> str:
        if self.icon:
            return os.path.basename(self.icon.name)
        else:
            return ""
