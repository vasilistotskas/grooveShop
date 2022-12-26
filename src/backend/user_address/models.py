from backend.core.models import TimeStampMixinModel
from backend.core.models import UUIDModel
from backend.country.models import Country
from backend.region.models import Region
from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _

User: str = settings.AUTH_USER_MODEL


class Address(TimeStampMixinModel, UUIDModel):
    BASEMENT = 0
    GROUND_FLOOR = 1
    FIRST_FLOOR = 2
    SECOND_FLOOR = 3
    THIRD_FLOOR = 4
    FOURTH_FLOOR = 5
    FIFTH_FLOOR = 6
    SIXTH_FLOOR_PLUS = 7

    FLOOR_CHOICES = (
        (BASEMENT, _("Basement")),
        (GROUND_FLOOR, _("Ground floor")),
        (FIRST_FLOOR, _("First floor")),
        (SECOND_FLOOR, _("Second floor")),
        (THIRD_FLOOR, _("Third floor")),
        (FOURTH_FLOOR, _("Fourth floor")),
        (FIFTH_FLOOR, _("Fifth floor")),
        (SIXTH_FLOOR_PLUS, _("Sixth floor and above")),
    )

    HOME = 0
    OFFICE = 1
    OTHER = 2

    LOCATION_CHOICES = (
        (HOME, _("Home")),
        (OFFICE, _("Office")),
        (OTHER, _("Other")),
    )

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    street = models.CharField(max_length=100)
    street_number = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    zipcode = models.CharField(max_length=100)
    country = models.ForeignKey(
        Country, null=True, blank=True, default=None, on_delete=models.SET_NULL
    )
    region = models.ForeignKey(
        Region, null=True, blank=True, default=None, on_delete=models.SET_NULL
    )
    floor = models.CharField(
        max_length=50, choices=FLOOR_CHOICES, null=True, blank=True, default=None
    )
    location_type = models.CharField(
        max_length=100, choices=LOCATION_CHOICES, null=True, blank=True, default=None
    )
    phone = models.CharField(max_length=100, null=True, blank=True, default=None)
    mobile_phone = models.CharField(max_length=100, null=True, blank=True, default=None)
    notes = models.CharField(max_length=100, null=True, blank=True, default=None)
    is_main = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "User's Addresses"
        ordering = ["-is_main", "id"]

    def __str__(self):
        return self.title

    def get_user_address(self):
        return Address.objects.filter(user=self.user).order_by("-created_at")

    def get_main_address(self):
        return Address.objects.filter(user=self.user, is_main=True).first()

    def get_user_address_count(self):
        return Address.objects.filter(user=self.user).count()
