from django.db import models
from django.conf import settings
from backend.product.models import Product

User = settings.AUTH_USER_MODEL


class PayWay(models.Model):

    PAY_WAYS = (
        ('Credit Card', 'Credit Card'),
        ('Pay On Delivery', 'Pay On Delivery'),
        ('Pay On Store', 'Pay On Store'),
        ('PayPal', 'PayPal')
    )

    PAY_WAY_STATUS = (
        ('True', 'Active'),
        ('False', 'Not Active'),
    )

    name = models.CharField(primary_key=True, max_length=50, choices=PAY_WAYS, unique=True)
    active = models.CharField(max_length=15, choices=PAY_WAY_STATUS, default=True)
    cost = models.DecimalField(max_digits=11, decimal_places=2, default=0.0)
    free_for_order_amount = models.DecimalField(max_digits=11, decimal_places=2, default=0.0)

    class Meta:
        verbose_name_plural = "Pay Ways"

    def __str__(self):
        return self.name

    @classmethod
    def active_pay_ways_by_status(cls, status: bool) -> dict["PayWay"]:
        return cls.objects.filter(active=status).values()


class Order(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, related_name='orders', on_delete=models.CASCADE, null=True)
    pay_way = models.ForeignKey(PayWay, blank=True, null=True, related_name="orders", on_delete=models.SET_NULL)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    zipcode = models.CharField(max_length=100)
    place = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    paid_amount = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    stripe_token = models.CharField(max_length=100)

    class Meta:
        ordering = ['-created_at',]
    
    def __str__(self):
        return self.first_name


class OrderItem(models.Model):
    id = models.AutoField(primary_key=True)
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='items', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return '%s' % self.id

