from django.contrib import admin

from .models import Tip


class TipAdmin(admin.ModelAdmin):
    list_display = ["title", "kind", "active", "created_at", "image_tag"]


admin.site.register(Tip, TipAdmin)
