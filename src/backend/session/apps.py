from django.apps import AppConfig
from django.contrib.auth import user_logged_in


class SessionConfig(AppConfig):
    name = "backend.session"

    def ready(self):
        from . import signals

        user_logged_in.connect(signals.update_session_user)
