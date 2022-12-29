from __future__ import annotations

from datetime import timedelta

from backend.session.models import MySession
from backend.user.models import UserAccount
from backend.user.serializers.account import UserAccountSerializer
from backend.user.serializers.profile import UserProfileSerializer
from django.contrib.auth import get_user_model
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
    serializer_class = UserProfileSerializer

    @action(detail=False, methods=["post"])
    def refresh_last_activity(self, request):
        session_key = request.session.session_key
        try:
            session = MySession.objects.get(session_key=session_key)
            session.last_activity = now()
            session.save()
            return Response({"success": True})
        except MySession.DoesNotExist:
            return Response({"success": False}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=["get"])
    def active_users_count(self, request):
        ten_minutes_ago = now() - timedelta(minutes=10)
        active_sessions = MySession.objects.filter(
            last_activity__gte=ten_minutes_ago
        ).exclude(user_id=None)
        active_sessions_count = active_sessions.count()
        return Response({"active_users_count": active_sessions_count})
