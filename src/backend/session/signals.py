from django.contrib.auth.signals import user_logged_in
from django.contrib.auth.signals import user_logged_out
from django.core.cache import cache
from django.dispatch import receiver


@receiver(user_logged_in)
def update_session_user_log_in(sender, request, user, **kwargs):
    try:
        request.session["user"] = user
        request.session.save()
        cache.set(
            "user." + request.session.session_key,
            {
                "last_activity": request.session["last_activity"],
                "user": request.session["user"],
            },
            timeout=60 * 60 * 24 * 7,
        )
    except AttributeError:
        pass


@receiver(user_logged_out)
def update_session_user_log_out(sender, request, user, **kwargs):
    try:
        request.session["user"] = None
        request.session.save()
        cache.delete("user." + request.session.session_key)
    except AttributeError:
        pass
