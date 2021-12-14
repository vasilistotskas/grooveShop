from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from user.models import UserProfile, Country, Region
from rest_framework import authentication, permissions, generics
from .serializers import UserProfileSerializer, CountrySerializer, RegionSerializer


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

