from backend.user_address.models import Address
from backend.user_address.paginators import AddressPagination
from backend.user_address.serializers import AddressSerializer
from rest_framework import authentication
from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class UserAddressList(generics.ListAPIView):
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = AddressPagination
    serializer_class = AddressSerializer

    def get_queryset(self):
        user = self.request.user
        return Address.objects.filter(user=user)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = AddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserAddressDetail(APIView):
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AddressSerializer

    def get(self, request, pk, format=None):
        try:
            address = Address.objects.get(pk=pk)
            serializer = AddressSerializer(address)
            return Response(serializer.data)
        except Address.DoesNotExist:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)

    def patch(self, request, pk, format=None):
        try:
            address = Address.objects.get(pk=pk)
        except Address.DoesNotExist:
            return Response(status=status.HTTP_204_NO_CONTENT)
        serializer = AddressSerializer(address, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        try:
            address = Address.objects.get(pk=pk)
            address.delete()
        except Address.DoesNotExist:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)
