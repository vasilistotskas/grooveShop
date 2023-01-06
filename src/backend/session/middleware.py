import logging

from django.core.cache import cache
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

        request.session["last_activity"] = now()
        request.session.save()

        try:
            cache.add(
                "user." + request.session.session_key,
                {
                    "last_activity": request.session["last_activity"],
                    "user": request.session["user"],
                },
                timeout=60 * 60 * 24 * 7,
            )
        except AttributeError:
            cache.set(
                "user." + request.session.session_key,
                {
                    "last_activity": request.session["last_activity"],
                    "user": request.session["user"],
                },
                timeout=60 * 60 * 24 * 7,
            )

        logger.info(
            "SessionTraceMiddleware processed request",
            extra={
                "request": request,
                "response": response,
            },
        )

        return response
