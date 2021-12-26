from django.db import models
from django.dispatch import receiver
from django.utils.safestring import mark_safe
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.conf import settings
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

    def get_full_name(self):
        return self.first_name

    def get_short_name(self):
        return self.first_name

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
    image = models.ImageField(blank=True, null=True, upload_to='uploads/users/', default='uploads/users/default.png')

    class Meta:
        verbose_name_plural = "User's Profile"

    def __str__(self):
        return '%s' % self.user.id

    def email(self):
        return self.user.email

    def image_url(self):
        return 'http://localhost:8000' + self.image.url

    def image_tag(self):
        if self.image:
            return mark_safe('<img src="{}" height="50"/>'.format(self.image.url))

    # use Django signals to create user profile on user creation
    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            UserProfile.objects.create(user=instance)

    image_tag.short_description = 'Image'