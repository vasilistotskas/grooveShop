from backend.user.models import UserAccount
from backend.user.models import UserAddress
from backend.user.models import UserProfile
from django.contrib import admin


class AddressInline(admin.TabularInline):
    model = UserAddress
    extra = 1


class UserProfileAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "first_name",
        "last_name",
        "phone",
        "email",
        "city",
        "zipcode",
        "address",
        "place",
        "country",
        "region",
        "image_tag",
    ]
    search_fields = ["user__username", "email"]


class UserAccountAdmin(admin.ModelAdmin):
    list_display = ["email", "first_name", "last_name", "is_active", "is_staff"]
    inlines = [AddressInline]


admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(UserAccount, UserAccountAdmin)
