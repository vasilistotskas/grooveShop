from backend.region.models import Region
from django.contrib import admin


class RegionInline(admin.TabularInline):
    model = Region
    extra = 1


admin.site.register(Region)
