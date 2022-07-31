import os
from django.db import models
from django.conf import settings
from django.utils.safestring import mark_safe
from backend.tip.validators import validate_file_extension


class Tip(models.Model):
    TIP_KINDS = (
        ('success', 'success'),
        ('info', 'info'),
        ('error', 'error'),
        ('warning', 'warning'),
    )
    title = models.CharField(max_length=200)
    content = models.TextField(max_length=1000)
    kind = models.CharField(max_length=10, choices=TIP_KINDS, default=True)
    icon = models.FileField(upload_to="uploads/tip/", validators=[validate_file_extension])
    url = models.CharField(max_length=200)
    created_at = models.DateField(auto_now_add=True)
    active = models.BooleanField(default=True)

    class Meta:
        ordering = ["-created_at"]

    def image_tag(self):
        try:
            icon = self.icon
            if icon:
                return mark_safe('<img src="{}" height="50"/>'.format(icon.url))
            return ''
        except:
            return ""


    @property
    def main_image_absolute_url(self) -> str:
        try:
            if self.id is not None:
                icon = settings.APP_BASE_URL + self.icon.url
            else:
                icon = ""
            return icon
        except:
            return ""

    @property
    def main_image_filename(self) -> str:
        try:
            return os.path.basename(self.icon.name)
        except:
            return ""