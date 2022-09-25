from backend.tip.models import Tip
from django.contrib import admin


class TipAdmin(admin.ModelAdmin):
    list_display = ["title", "kind", "active", "created_at", "image_tag"]


admin.site.register(Tip, TipAdmin)
