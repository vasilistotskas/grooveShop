from backend.country.models import Country
from backend.region.admin import RegionInline
from django.contrib import admin


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    inlines = [RegionInline]
