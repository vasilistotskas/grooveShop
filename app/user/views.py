import json
from django.http import Http404
from django.http import JsonResponse
from djoser.views import UserViewSet
from djoser.utils import ActionViewMixin
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from djoser.conf import settings as djoser_settings
from user.models import UserProfile, Country, Region
from django.views.decorators.http import require_POST
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import authentication, generics, permissions, response, status
from djoser.compat import get_user_email, get_user_email_field_name
from .serializers import UserProfileSerializer, CountrySerializer, RegionSerializer

User = get_user_model()


class ResendActivationView(ActionViewMixin, generics.GenericAPIView):
    """
    Use this endpoint to resend user activation email.
    """
    serializer_class = djoser_settings.SERIALIZERS.password_reset
    permission_classes = [permissions.AllowAny]

    _users = None

    def _action(self, serializer):
        for user in self.get_users(serializer.data['email']):
            self.send_activation_email(user)
        return response.Response(status=status.HTTP_204_NO_CONTENT)

    def get_users(self, email):
        if self._users is None:
            email_field_name = get_user_email_field_name(User)
            users = User._default_manager.filter(**{
                email_field_name + '__iexact': email
            })
            self._users = [
                u for u in users if not u.is_active and u.has_usable_password()
            ]
        return self._users

    def send_activation_email(self, user):
        context = {'user': user}
        to = [get_user_email(user)]
        djoser_settings.EMAIL.activation(self.request, context).send(to)


class ActivateUser(UserViewSet):
    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs.setdefault('context', self.get_serializer_context())
        kwargs['data'] = {"uid": self.kwargs['uid'], "token": self.kwargs['token']}

        return serializer_class(*args, **kwargs)

    @action(["post"], detail=False)
    def activation(self, request, *args, **kwargs):
        super().activation(request, *args, **kwargs)
        return Response(status=status.HTTP_204_NO_CONTENT)


@require_POST
def login_view(request):
    data = json.loads(request.body)
    email = data.get('email')
    password = data.get('password')

    if email is None or password is None:
        return JsonResponse({'detail': 'Please provide email and password.'}, status=400)

    user = authenticate(email=email, password=password)

    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

    login(request, user)
    return JsonResponse({'detail': 'Successfully logged in.'})


@require_POST
def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You\'re not logged in.'}, status=400)

    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})


@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'isAuthenticated': True})


class UserProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        """
        This view should return a list of authenticated user profile for
        the user as determined by the pk portion of the URL.
        """
        try:
            pk = self.kwargs['pk']
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


class CountriesList(generics.ListAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer


class CountryDetail(generics.ListAPIView):
    serializer_class = RegionSerializer

    def get_queryset(self):
        """
        This view should return a list of all models by
        the maker passed in the URL
        """
        alpha_2 = self.kwargs['alpha_2']
        return Region.objects.filter(alpha_2=alpha_2)

