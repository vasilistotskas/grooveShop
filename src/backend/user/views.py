import json

from backend.user.models import UserAccount
from backend.user.models import UserProfile
from backend.user.serializers import UserProfileSerializer
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.contrib.auth import login
from django.contrib.auth import logout
from django.http import Http404
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from djoser.compat import get_user_email
from djoser.compat import get_user_email_field_name
from djoser.conf import settings as djoser_settings
from djoser.utils import ActionViewMixin
from djoser.views import UserViewSet
from rest_framework import authentication
from rest_framework import generics
from rest_framework import permissions
from rest_framework import response
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

User = get_user_model()


class ResendActivationView(ActionViewMixin, generics.GenericAPIView):
    serializer_class = djoser_settings.SERIALIZERS.password_reset
    permission_classes = [permissions.AllowAny]

    _users = None

    def _action(self, serializer):
        if self.user_is_active(serializer.data["email"]):
            return Response(
                "User is already active", status=status.HTTP_400_BAD_REQUEST
            )
        for user in self.get_users(serializer.data["email"]):
            self.send_activation_email(user)
        return response.Response(status=status.HTTP_204_NO_CONTENT)

    def get_users(self, email):
        if self._users is None:
            email_field_name = get_user_email_field_name(User)
            users = User._default_manager.filter(
                **{email_field_name + "__iexact": email}
            )
            self._users = [
                u for u in users if not u.is_active and u.has_usable_password()
            ]
        return self._users

    def user_is_active(self, email) -> bool:
        email_field_name = get_user_email_field_name(User)
        users = User._default_manager.filter(**{email_field_name + "__iexact": email})

        for u in users:
            if u.is_active:
                return True

        return False

    def send_activation_email(self, user):
        context = {"user": user}
        to = [get_user_email(user)]
        djoser_settings.EMAIL.activation(self.request, context).send(to)


class ActivateUser(UserViewSet):
    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs.setdefault("context", self.get_serializer_context())
        kwargs["data"] = {"uid": self.kwargs["uid"], "token": self.kwargs["token"]}

        return serializer_class(*args, **kwargs)

    @action(["post"], detail=False)
    def activation(self, request, *args, **kwargs):
        super().activation(request, *args, **kwargs)
        return Response(status=status.HTTP_204_NO_CONTENT)


@require_POST
def login_view(request):
    data = json.loads(request.body)
    email = data.get("email")
    password = data.get("password")

    if email is None or password is None:
        return JsonResponse(
            {"detail": "Please provide email and password."}, status=400
        )

    user = authenticate(email=email, password=password)

    if user is None:
        return JsonResponse({"detail": "Invalid credentials."}, status=400)

    login(request, user)
    return JsonResponse({"detail": "Successfully logged in."})


@require_POST
def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"detail": "You're not logged in."}, status=400)

    logout(request)
    return JsonResponse({"detail": "Successfully logged out."})


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

    @staticmethod
    def get(request, format=None):
        userprofile = UserProfile.objects.filter(user=request.user)
        serializer = UserProfileSerializer(userprofile, many=True)
        return Response(serializer.data)


class ClearAllUserSessions(APIView):
    def post(self, request, format=None):
        if not request.user.is_authenticated:
            return Response("Forbidden", status=status.HTTP_403_FORBIDDEN)

        try:
            user = UserAccount.objects.get(email=request.user)
            UserAccount.remove_all_sessions(user)
        except UserAccount.DoesNotExist:
            raise Http404

        return Response("Success", status=status.HTTP_200_OK)
