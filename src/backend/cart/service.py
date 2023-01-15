from __future__ import annotations

from typing import Literal

from backend.cart.models import Cart
from backend.cart.models import CartItem
from backend.core import caches
from backend.product.models.product import Product
from django.http import HttpRequest


class CartService(object):
    cart: Cart
    cart_items: list
    total_cost: float
    tax: float
    total_cost_with_tax: float

    def __init__(self, request: HttpRequest):
        if request.user.is_authenticated and "cart_id" in request.session:
            try:
                self.cart = Cart.objects.get(id=request.session["cart_id"])
                request.session.pop("cart_id")
            except Cart.DoesNotExist:
                self.cart = Cart.objects.get(id=request.session["cart_id"])
                self.cart.user = request.user
                self.cart.save()
                request.session.pop("cart_id")
        elif request.user.is_authenticated:
            try:
                self.cart = Cart.objects.get(user=request.user)
            except Cart.DoesNotExist:
                self.cart = Cart(user=request.user)
                self.cart.save()
        elif "cart_id" in request.session:
            try:
                self.cart = Cart.objects.get(id=request.session["cart_id"])
            except Cart.DoesNotExist:
                request.session.pop("cart_id")
                self.cart = Cart()
                self.cart.save()
                request.session["cart_id"] = self.cart.id
        else:
            self.cart = Cart()
            self.cart.save()
            request.session["cart_id"] = self.cart.id

        self.load_items()

    def __str__(self):
        return f"Cart {self.cart.user}"

    def __len__(self):
        return self.cart.total_items

    def __iter__(self):
        for item in self.cart_items:
            yield item

    def process_user_cart(
        self, request: HttpRequest, option: Literal["merge", "clean", "keep"]
    ) -> None:
        try:
            user_cart = Cart.objects.get(user=request.user)
        except Cart.DoesNotExist:
            user_cart = Cart(user=request.user)
            user_cart.save()

        pre_log_in_cart_id = caches.get(str(request.user.id))
        try:
            pre_log_in_cart = Cart.objects.get(id=pre_log_in_cart_id)
        except Cart.DoesNotExist:
            pre_log_in_cart = None

        if option == "merge" and pre_log_in_cart:
            self.merge_carts(request, user_cart, pre_log_in_cart)
        elif option == "clean":
            self.clean_user_cart(user_cart)
        elif option == "keep":
            pass

    @staticmethod
    def merge_carts(
        request: HttpRequest, user_cart: Cart, pre_log_in_cart: Cart
    ) -> None:
        user_id = request.user.id
        for item in pre_log_in_cart.cart_item_cart.all():
            try:
                CartItem.objects.get(cart=user_cart, product=item.product)
            except CartItem.DoesNotExist:
                item.cart = user_cart
                item.save()

        pre_log_in_cart.delete()
        caches.delete(str(user_id))

    @staticmethod
    def clean_user_cart(user_cart: Cart) -> None:
        user_cart.cart_item_cart.all().delete()
        user_cart.save()

    def load_items(self) -> list[CartItem]:
        self.cart_items = self.cart.get_items()
        return self.cart_items

    def refresh_last_activity(self) -> None:
        self.cart.refresh_last_activity()

    def get_cart_item(self, product_id: int) -> CartItem:
        return self.cart.cart_item_cart.get(product_id=product_id)

    def create_cart_item(self, product: Product, quantity: int) -> CartItem:
        cart_item = CartItem(cart=self.cart, product=product, quantity=quantity)
        cart_item.save()
        self.load_items()
        return cart_item

    def update_cart_item(self, product_id: int, quantity: int) -> CartItem:
        cart_item = self.cart.cart_item_cart.get(product_id=product_id)
        cart_item.quantity = quantity
        cart_item.save()
        self.load_items()
        return cart_item

    def delete_cart_item(self, product_id: int) -> None:
        self.cart.cart_item_cart.get(product_id=product_id).delete()
        self.load_items()
