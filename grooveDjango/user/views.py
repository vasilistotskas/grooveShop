from django.shortcuts import render
from user.models import UserProfile
from rest_framework import status, authentication, permissions, generics, viewsets
from .serializers import UserSerializer, UserProfileSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import Http404
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
from django.contrib.auth.models import User
from rest_framework import mixins
from rest_framework import generics


class UserProfileList(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class UserProfileDetail(generics.RetrieveUpdateDestroyAPIView):
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


class UserProfileDetailAuth(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        userprofile = UserProfile.objects.filter(user=request.user)
        serializer = UserProfileSerializer(userprofile, many=True)
        return Response(serializer.data)


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        """
        This view should return a list of authenticated user profile for
        the user as determined by the pk portion of the URL.
        """
        try:
            pk = self.kwargs['pk']
            return User.objects.filter(id=pk)
        except UserProfile.DoesNotExist:
            raise Http404


