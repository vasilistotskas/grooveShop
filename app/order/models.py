from django.db import models
from product.models import Product
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Order(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, related_name='orders', on_delete=models.CASCADE, null=True)
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


class PayWay(models.Model):

    PAY_WAYS = (
        ('Credit Card', 'Credit Card'),
        ('Pay On Delivery', 'Pay On Delivery'),
        ('Pay On Store', 'Pay On Store')
    )

    PAY_WAY_STATUS = (
        ('True', 'Active'),
        ('False', 'Not Active'),
    )

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, choices=PAY_WAYS, unique=True)
    active = models.CharField(max_length=15, choices=PAY_WAY_STATUS, default=True)

    class Meta:
        verbose_name_plural = "Pay ways"

    def __str__(self):
        return self.name

    # an tha einai h Product h ProductType --- Union["Product", "ProductType"]
    # type Optional["Product"]
    # type Iterable["Product"]
    # type List["Product"]

    # from enum import Enum
    #
    # class MenuErrorCode(Enum):
    #     CANNOT_ASSIGN_NODE = "cannot_assign_node"
    #     GRAPHQL_ERROR = "graphql_error"
    #     INVALID = "invalid"

    @classmethod
    def active_pay_ways_by_status(cls, status: bool) -> dict["PayWay"]:
        return cls.objects.filter(active=status).values()
