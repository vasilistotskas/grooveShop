from backend.session.models import MySession
from django.contrib.sessions.backends.db import SessionStore as DBStore


class SessionStore(DBStore):
    @classmethod
    def get_model_class(cls):
        return MySession

    def create_model_instance(self, data):
        obj = super().create_model_instance(data)
        try:
            user_id = data.get("user_id")
        except (ValueError, TypeError):
            user_id = None

        obj.user_id = user_id
        return obj
