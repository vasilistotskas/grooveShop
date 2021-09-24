from django.contrib import admin

from .models import UserProfile


class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'first_name', 'last_name', 'email', 'address', 'zipcode', 'place', 'phone', 'image_tag']
    search_fields = ['user__username', 'email']


admin.site.register(UserProfile, UserProfileAdmin)
