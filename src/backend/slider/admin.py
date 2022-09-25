from typing import List

import admin_thumbnails
from django.contrib import admin

from .models import Slide
from .models import Slider


@admin_thumbnails.thumbnail("image")
class SliderSlidesInline(admin.StackedInline):
    model = Slide
    exclude: List[str] = []
    readonly_fields = ("id", "thumbnail")
    extra = 0


class SliderAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "image_tag"]
    search_fields = ["id", "title"]
    inlines = [SliderSlidesInline]
    prepopulated_fields = {"title": ("name",)}
    readonly_fields = ("image_tag", "thumbnail")
    actions = [""]


class SlideAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "image_tag", "order_position"]
    search_fields = ["id", "title", "slider__name"]
    readonly_fields = ("image_tag", "thumbnail")
    actions = [""]


admin.site.register(Slider, SliderAdmin)
admin.site.register(Slide, SlideAdmin)
