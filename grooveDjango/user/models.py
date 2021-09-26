from django.db import models
from django.contrib.auth.models import User
from django.utils.safestring import mark_safe
from django.db.models.signals import post_save
from django.dispatch import receiver
from django_countries.fields import CountryField
from .counties import gr_counties


class UserProfile(models.Model):
    user = models.OneToOneField(User, related_name='userprofile', on_delete=models.CASCADE)
    first_name = models.CharField(max_length=20, blank=True, null=True)
    last_name = models.CharField(max_length=20, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.CharField(max_length=50, blank=True, null=True)
    city = models.CharField(max_length=50, blank=True, null=True)
    zipcode = models.CharField(max_length=20, blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    place = models.CharField(max_length=50, blank=True, null=True)
    country = CountryField()
    county = models.CharField(max_length=50, choices=gr_counties.COUNTIES, blank=True, null=True)
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
