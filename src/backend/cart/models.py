from backend.core.models import TimeStampMixinModel
from backend.core.models import UUIDModel
from django.db import models
from django.utils.timezone import now


class Cart(TimeStampMixinModel, UUIDModel):
    user = models.ForeignKey(
        "user.UserAccount",
        related_name="cart_user",
        null=True,
        blank=True,
        default=None,
        on_delete=models.CASCADE,
    )
    last_activity = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Cart"
        ordering = ["-created_at"]
        unique_together = ["user"]

    def __str__(self):
        return f"Cart {self.user} - {self.id}"

    def get_items(self) -> list["CartItem"]:
        return self.cart_item_cart.prefetch_related("product").all()

    def refresh_last_activity(self):
        self.last_activity = now()
        self.save()

    @property
    def total_price(self) -> float:
        return sum([item.total_price for item in self.get_items()])

    @property
    def total_discount_value(self) -> float:
        return sum([item.total_discount_value for item in self.get_items()])

    @property
    def total_vat_value(self) -> float:
        return sum([item.product.vat_value for item in self.get_items()])

    @property
    def total_items(self) -> int:
        return sum([item.quantity for item in self.get_items()])

    @property
    def total_items_unique(self) -> int:
        return self.cart_item_cart.count()


class CartItem(TimeStampMixinModel, UUIDModel):
    cart = models.ForeignKey(
        "cart.Cart", related_name="cart_item_cart", on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        "product.Product", related_name="cart_item_product", on_delete=models.CASCADE
    )
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        verbose_name_plural = "Cart Items"
        ordering = ["id"]
        unique_together = (("cart", "product"),)

    def __str__(self):
        return f"{self.product.name} - {self.quantity}"

    @property
    def total_price(self) -> float:
        return self.quantity * self.product.final_price

    @property
    def total_discount_value(self) -> float:
        return self.quantity * self.product.discount_value

    @property
    def product_discount_percent(self) -> float:
        return self.product.discount_percent

    def update_quantity(self, quantity) -> None:
        self.quantity = quantity
        self.save()
