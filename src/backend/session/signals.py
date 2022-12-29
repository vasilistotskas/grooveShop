from backend.session.models import MySession
from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver


@receiver(user_logged_in)
def update_session_user(sender, request, user, **kwargs):
    session_key = request.session.session_key
    try:
        session = MySession.objects.get(session_key=session_key)
        session.user = user
        session.save()
    except MySession.DoesNotExist:
        pass
