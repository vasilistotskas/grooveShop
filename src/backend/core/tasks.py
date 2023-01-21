from celery import shared_task
from celery.utils.log import get_task_logger
from django.core.cache import cache

logger = get_task_logger(__name__)


@shared_task(bind=True, name="Clear Sessions For None Users Task")
def clear_sessions_for_none_users_task():
    from backend.core import caches

    for key in cache.keys(caches.USER + "_*"):
        if key.split("_")[1] == "NONE":
            caches.delete(key)

    caches.set(caches.CLEAR_SESSIONS_FOR_NONE_USERS_TASK, True, caches.ONE_HOUR)
