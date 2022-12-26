from backend.country.models import Country
from backend.region.admin import RegionInline
from django.contrib import admin


class CountryAdmin(admin.ModelAdmin):
    inlines = [RegionInline]


admin.site.register(Country, CountryAdmin)
