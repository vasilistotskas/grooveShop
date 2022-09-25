import logging
import os

from celery import Celery
from celery.signals import setup_logging


CELERY_LOGGER_NAME = "celery"


@setup_logging.connect
def setup_celery_logging(loglevel=None, **kwargs):
    if loglevel:
        logging.getLogger(CELERY_LOGGER_NAME).setLevel(loglevel)


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.app.settings")

app = Celery("app")

app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
app.autodiscover_tasks(related_name="search_tasks")
