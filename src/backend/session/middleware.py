import logging

from backend.cart.service import CartService
from backend.core import caches
from django.core.serializers import serialize
from django.utils.timezone import now

logger = logging.getLogger(__name__)


class SessionTraceMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        user = None
        json_user = None

        if hasattr(request, "user") and request.user.is_authenticated:
            json_user = serialize(
                "json",
                [
                    request.user,
                ],
            )
            request.session["user"] = json_user
        else:
            request.session["user"] = None

        if hasattr(request, "session") and not hasattr(
            request.session, "pre_log_in_cart_id"
        ):
            cart_service = CartService(request)
            pre_log_in_cart_id = cart_service.cart.id
            request.session["pre_log_in_cart_id"] = pre_log_in_cart_id

        request.session["last_activity"] = now()
        request.session["referer"] = request.META.get("HTTP_REFERER", None)
        request.session.save()

        if hasattr(request, "user") and request.user.is_authenticated:
            caches.set(
                caches.USER + "_" + str(request.user.id),
                {
                    "last_activity": request.session["last_activity"],
                    "user": json_user,
                    "referer": request.META.get("HTTP_REFERER", None),
                    "session_key": request.session.session_key,
                },
                caches.ONE_HOUR,
            )
        else:
            caches.set(
                caches.USER + "_" + "NONE" + "_" + request.session.session_key,
                {
                    "last_activity": request.session["last_activity"],
                    "user": user,
                    "referer": request.META.get("HTTP_REFERER", None),
                    "session_key": request.session.session_key,
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
