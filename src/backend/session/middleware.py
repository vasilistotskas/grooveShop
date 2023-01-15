import logging

from backend.cart.service import CartService
from backend.core import caches
from django.utils.timezone import now

logger = logging.getLogger(__name__)


class SessionTraceMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if hasattr(request, "user") and request.user.is_authenticated:
            request.session["user"] = request.user
        else:
            request.session["user"] = None

        has_key = request.session.get("cached_session_key", None)
        if has_key is None:
            request.session["cached_session_key"] = request.session.session_key

        if hasattr(request, "session") and not hasattr(
            request.session, "pre_log_in_cart_id"
        ):
            cart_service = CartService(request)
            pre_log_in_cart_id = cart_service.cart.id
            request.session["pre_log_in_cart_id"] = pre_log_in_cart_id

        request.session["last_activity"] = now()
        request.session["referer"] = request.META.get("HTTP_REFERER", None)
        request.session.save()

        try:
            caches.add(
                caches.SESSION + request.session.session_key,
                {
                    "last_activity": request.session["last_activity"],
                    "user": request.session["user"],
                    "referer": request.META.get("HTTP_REFERER", None),
                },
                caches.ONE_HOUR,
            )
        except AttributeError:
            caches.set(
                caches.SESSION + request.session.session_key,
                {
                    "last_activity": request.session["last_activity"],
                    "user": request.session["user"],
                    "referer": request.META.get("HTTP_REFERER", None),
                },
                caches.ONE_HOUR,
            )

        logger.info(
            "SessionTraceMiddleware processed request",
            extra={
                "request": request,
                "response": response,
            },
        )

        return response
