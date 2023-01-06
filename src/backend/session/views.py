from __future__ import annotations

from datetime import timedelta

from backend.user.models import UserAccount
from backend.user.serializers.account import UserAccountSerializer
from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.http import JsonResponse
from django.utils.timezone import now
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import status
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import action
from rest_framework.generics import GenericAPIView
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

User = get_user_model()


@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": False})

    return JsonResponse({"isAuthenticated": True})


class ClearAllUserSessions(GenericAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = UserAccountSerializer

    def post(self, request, format=None):
        if not request.user.is_authenticated:
            return Response("Forbidden", status=status.HTTP_403_FORBIDDEN)

        user = get_object_or_404(UserAccount, email=self.request.user)
        UserAccount.remove_all_sessions(user)

        return Response("Success", status=status.HTTP_200_OK)


class ActiveUserViewSet(ViewSet):
    serializer_class = UserAccountSerializer

    @action(detail=False, methods=["post"])
    def refresh_last_activity(self, request):
        try:
            session = request.session
            session.last_activity = now()
            session.save()
            return Response({"success": True})
        except AttributeError:
            return Response({"success": False}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=["get"])
    def active_users_count(self, request):
        active_users = 0
        for key in cache.keys("user*"):
            cache_session = cache.get(key)
            if cache_session.get("last_activity") and cache_session.get("user"):
                user = cache_session.get("user")
                last_activity = cache_session.get("last_activity")
                if (
                    now() - last_activity < timedelta(minutes=5)
                ) and user.is_authenticated:
                    active_users += 1
        return Response({"active_users": active_users})
