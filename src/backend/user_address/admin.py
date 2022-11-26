from backend.user_address.models import Address
from django.contrib import admin


class AddressInline(admin.TabularInline):
    model = Address
    extra = 1
