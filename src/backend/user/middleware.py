from django.utils.timezone import now


class AnonymousUserTrackingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        response = self.get_response(request)
        if request.user.is_anonymous:
            has_key = request.session.get("cached_session_key", None)
            if has_key is None:
                request.session["cached_session_key"] = request.session.session_key
            print(
                'request.session["cached_session_key"]',
                request.session["cached_session_key"],
            )

        return response


class LastActivityTraceMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        session = request.session
        session.last_activity = now()
        print("session", session)
        session.save()
        return response
