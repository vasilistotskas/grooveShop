from __future__ import annotations

from backend.core.api.views import BaseExpandView
from backend.user.models import UserAddress
from backend.user.paginators.address import UserAddressPagination
from backend.user.serializers.address import UserAddressSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.filters import OrderingFilter
from rest_framework.filters import SearchFilter
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


class UserAddressViewSet(BaseExpandView, ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = UserAddress.objects.all()
    serializer_class = UserAddressSerializer
    pagination_class = UserAddressPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = [
        "id",
        "user",
        "country",
        "city",
        "street",
        "zipcode",
        "floor",
        "location_type",
        "is_main",
    ]
    ordering_fields = [
        "id",
        "user",
        "country",
        "city",
        "street",
        "zipcode",
        "floor",
        "location_type",
        "is_main",
        "created_at",
    ]
    ordering = ["id"]
    search_fields = ["id", "user", "country", "city", "street", "zipcode"]

    def list(self, request, *args, **kwargs) -> Response:
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs) -> Response:
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None, *args, **kwargs) -> Response:
        address = get_object_or_404(UserAddress, pk=pk)
        serializer = self.get_serializer(address)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None, *args, **kwargs) -> Response:
        address = get_object_or_404(UserAddress, pk=pk)
        serializer = self.get_serializer(address, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None, *args, **kwargs) -> Response:
        address = get_object_or_404(UserAddress, pk=pk)
        serializer = self.get_serializer(address, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None, *args, **kwargs) -> Response:
        address = get_object_or_404(UserAddress, pk=pk)
        address.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
