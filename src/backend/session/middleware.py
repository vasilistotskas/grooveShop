import logging

from backend.session.models import MySession

logger = logging.getLogger(__name__)


class SessionTraceMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        session_key = request.session.session_key
        try:
            session = MySession.objects.get(session_key=session_key)
            if request.user.is_authenticated:
                session.user = request.user
                session.save()
        except MySession.DoesNotExist:
            has_key = request.session.get("cached_session_key", None)
            if has_key is None:
                request.session["cached_session_key"] = request.session.session_key

        # Log the request and response
        logger.info(
            "SessionTraceMiddleware processed request",
            extra={
                "request": request,
                "response": response,
            },
        )

        return response
