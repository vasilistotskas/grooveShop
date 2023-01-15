from backend.cart.service import CartService
from backend.core import caches
from django.contrib.auth.signals import user_logged_in
from django.contrib.auth.signals import user_logged_out
from django.dispatch import receiver


@receiver(user_logged_in)
def update_session_user_log_in(sender, request, user, **kwargs):
    try:
        request.session["user"] = user

        caches.set(
            str(user.id),
            request.session["pre_log_in_cart_id"],
            caches.ONE_HOUR,
        )

        cart_service = CartService(request)
        cart_service.process_user_cart(request, option="merge")
        cart_id = cart_service.cart.id

        caches.set(
            caches.SESSION + request.session.session_key,
            {
                "last_activity": request.session["last_activity"],
                "user": request.session["user"],
                "cart_id": cart_id,
            },
            caches.ONE_HOUR,
        )

        request.session.save()
    except AttributeError:
        pass


@receiver(user_logged_out)
def update_session_user_log_out(sender, request, user, **kwargs):
    try:
        request.session["user"] = None
        request.session.save()
        caches.delete(caches.SESSION + request.session.session_key)
    except AttributeError:
        pass
