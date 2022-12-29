from __future__ import annotations

from django.contrib.sessions.models import Session
from django.db import models


class MySession(Session):
    user = models.ForeignKey("user.UserAccount", on_delete=models.CASCADE, null=True)
    last_activity = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "my_session"
