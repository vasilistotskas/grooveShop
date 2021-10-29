from django.db import models
from django.contrib.auth.models import User
from django.utils.safestring import mark_safe
from django.db.models.signals import post_save
from django.dispatch import receiver
from django_countries.fields import CountryField


class Country(models.Model):
    name = models.CharField(max_length=50)
    alpha_2 = models.CharField(max_length=2, primary_key=True)
    alpha_3 = models.CharField(max_length=3)
    iso_cc = models.PositiveSmallIntegerField(blank=True, null=True)
    phone_code = models.CharField(max_length=10)

    class Meta:
        verbose_name_plural = "Countries"

    def __str__(self):
        return self.name


class Region(models.Model):
    name = models.CharField(max_length=100)
    alpha = models.CharField(max_length=10, primary_key=True)
    alpha_2 = models.ForeignKey(Country, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Regions"

    def __str__(self):
        return self.name


class UserProfile(models.Model):
    user = models.OneToOneField(User, related_name='userprofile', on_delete=models.CASCADE)
    first_name = models.CharField(max_length=20, blank=True, null=True)
    last_name = models.CharField(max_length=20, blank=True, null=True)
    phone = models.PositiveIntegerField(blank=True, null=True)
    email = models.CharField(max_length=50, blank=True, null=True)
    city = models.CharField(max_length=50, blank=True, null=True)
    zipcode = models.PositiveIntegerField(blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    place = models.CharField(max_length=50, blank=True, null=True)
    country = models.ForeignKey(Country, null=True, blank=True, default=None, on_delete=models.SET_NULL)
    region = models.ForeignKey(Region, null=True, blank=True, default=None, on_delete=models.SET_NULL)
    image = models.ImageField(blank=True, null=True, upload_to='images/users/', default='images/users/default.png')

    class Meta:
        verbose_name_plural = "User's Profile"

    def __str__(self):
        return self.user.username

    def image_tag(self):
        if self.image:
            return mark_safe('<img src="{}" height="50"/>'.format(self.image.url))

    # use Django signals to create user profile on user creation
    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            UserProfile.objects.create(user=instance)


    image_tag.short_description = 'Image'
