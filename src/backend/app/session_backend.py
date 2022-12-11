from django.contrib.sessions.backends.db import SessionStore as DBStore
from backend.user.models import MySession


class SessionStore(DBStore):

    @classmethod
    def get_model_class(cls):
        return MySession

    def create_model_instance(self, data):
        """
        overriding the function to save the changes to db using `session["user_id"] = user.id` .
        This will create the model instance with the custom field values.
        When you add more field to the custom session model you have to update the function
        to handle those fields as well.
        """
        obj = super().create_model_instance(data)
        try:
            user_id = data.get('user_id')
        except (ValueError, TypeError):
            user_id = None

        obj.user_id = user_id
        return obj
