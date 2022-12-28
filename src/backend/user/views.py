from datetime import timedelta

from backend.user.models import MySession
from backend.user.models import UserAccount
from backend.user.models import UserProfile
from backend.user.serializers import UserProfileSerializer
from django.contrib.auth import get_user_model
from django.http import Http404
from django.http import JsonResponse
from django.utils.timezone import now
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import authentication
from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet

User = get_user_model()


@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": False})

    return JsonResponse({"isAuthenticated": True})


class UserProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        try:
            pk = self.kwargs["pk"]
            user = self.request.user
            return UserProfile.objects.filter(id=pk, user=user)
        except UserProfile.DoesNotExist:
            raise Http404


class UserProfileData(APIView):
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserProfileSerializer

    @staticmethod
    def get(request, format=None):
        userprofile = UserProfile.objects.filter(user=request.user)
        serializer = UserProfileSerializer(userprofile, many=True)
        return Response(serializer.data)


class ClearAllUserSessions(APIView):
    serializer_class = UserProfileSerializer

    def post(self, request, format=None):
        if not request.user.is_authenticated:
            return Response("Forbidden", status=status.HTTP_403_FORBIDDEN)

        try:
            user = UserAccount.objects.get(email=request.user)
            UserAccount.remove_all_sessions(user)
        except UserAccount.DoesNotExist:
            raise Http404

        return Response("Success", status=status.HTTP_200_OK)


class ActiveUserViewSet(ViewSet):
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
