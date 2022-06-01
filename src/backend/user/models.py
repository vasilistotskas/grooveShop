import os
from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.utils.safestring import mark_safe
from django.db.models.signals import post_save
from django.contrib.sessions.models import Session
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

User = settings.AUTH_USER_MODEL


class UserAccountManager(BaseUserManager):

    def create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given username, email, and password.
        """
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given username, email, and password.
        """
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def remove_all_sessions(self):
        user_sessions = []
        for session in Session.objects.all():
            if str(self.pk) == session.get_decoded().get('_auth_user_id'):
                user_sessions.append(session.pk)
        return Session.objects.filter(pk__in=user_sessions).delete()

    def __str__(self):
        return self.email


class Country(models.Model):
    name = models.CharField(max_length=50, unique=True)
    alpha_2 = models.CharField(max_length=2, primary_key=True, unique=True)
    alpha_3 = models.CharField(max_length=3, unique=True)
    iso_cc = models.PositiveSmallIntegerField(blank=True, null=True, unique=True)
    phone_code = models.PositiveSmallIntegerField(blank=True, null=True, unique=True)
    image_flag = models.ImageField(blank=True, null=True, upload_to='uploads/country/')

    class Meta:
        verbose_name_plural = "Countries"

    def __str__(self):
        return self.name


class Region(models.Model):
    name = models.CharField(max_length=100, unique=True)
    alpha = models.CharField(max_length=10, primary_key=True, unique=True)
    alpha_2 = models.ForeignKey(Country, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Regions"

    def __str__(self):
        return self.name


class UserProfile(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, related_name='userprofile', on_delete=models.CASCADE)
    first_name = models.CharField(max_length=20, blank=True, null=True)
    last_name = models.CharField(max_length=20, blank=True, null=True)
    phone = models.PositiveBigIntegerField(blank=True, null=True)
    city = models.CharField(max_length=50, blank=True, null=True)
    zipcode = models.PositiveIntegerField(blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    place = models.CharField(max_length=50, blank=True, null=True)
    country = models.ForeignKey(Country, null=True, blank=True, default=None, on_delete=models.SET_NULL)
    region = models.ForeignKey(Region, null=True, blank=True, default=None, on_delete=models.SET_NULL)
    image = models.ImageField(blank=True, null=True, upload_to='uploads/users/')

    class Meta:
        verbose_name_plural = "User's Profile"

    def __str__(self):
        return '%s' % self.user.id

    def get_user_profile_image_url(self):
        if self.image and hasattr(self.image, 'url'):
            return self.image.url
        else:
            return '/backend/static/images/default.png'

    def email(self):
        return self.user.email

    def main_image_absolute_url(self):
        if self.image and hasattr(self.image, 'url'):
            return settings.APP_BASE_URL + self.image.url
        else:
            return '/backend/static/images/default.png'

    def main_image_filename(self):
        if self.image and hasattr(self.image, 'url'):
            return os.path.basename(self.image.name)
        else:
            return os.path.basename('/backend/static/images/default.png')

    def image_tag(self):
        if self.image and hasattr(self.image, 'url'):
            return mark_safe('<img src="{}" height="50"/>'.format(self.image.url))
        else:
            return mark_safe('<img src="{}" height="50"/>'.format('/backend/static/images/default.png'))

    # use Django signals to create user profile on user creation
    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            UserProfile.objects.create(user=instance)

    image_tag.short_description = 'Image'
