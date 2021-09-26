from django.contrib import admin

from .models import UserProfile


class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'first_name', 'last_name', 'phone', 'email',  'city', 'zipcode', 'address', 'place', 'country', 'county', 'image_tag']
    search_fields = ['user__username', 'email']


admin.site.register(UserProfile, UserProfileAdmin)
