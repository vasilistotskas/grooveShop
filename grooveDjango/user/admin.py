from django.contrib import admin
from .models import UserProfile, Country, Region


class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'first_name', 'last_name', 'phone', 'email',  'city', 'zipcode', 'address', 'place', 'country', 'region', 'image_tag']
    search_fields = ['user__username', 'email']


class RegionInline(admin.TabularInline):
    model = Region
    extra = 1


class CountryAdmin(admin.ModelAdmin):
    inlines = [RegionInline]


admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(Country, CountryAdmin)
admin.site.register(Region)
