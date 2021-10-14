from django.shortcuts import render
from user.models import UserProfile, Country, Region
from rest_framework import status, authentication, permissions, generics, viewsets
from .serializers import UserSerializer, UserProfileSerializer, CountrySerializer, RegionSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import Http404
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
from django.contrib.auth.models import User
from rest_framework import mixins
from rest_framework import generics
from rest_framework.parsers import FormParser, MultiPartParser


class UserProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [authentication.TokenAuthentication]
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
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
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

