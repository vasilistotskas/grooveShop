from __future__ import annotations

from backend.core.api.views import BaseExpandView
from backend.core.filters.custom_filters import PascalSnakeCaseOrderingFilter
from backend.region.models import Region
from backend.region.paginators import RegionPagination
from backend.region.serializers import RegionSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


class RegionViewSet(BaseExpandView, ModelViewSet):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer
    pagination_class = RegionPagination
    filter_backends = [DjangoFilterBackend, PascalSnakeCaseOrderingFilter, SearchFilter]
    filterset_fields = ["name", "alpha", "alpha_2"]
    ordering_fields = ["name", "created_at"]
    ordering = ["-created_at"]
    search_fields = ["name", "alpha", "alpha_2"]

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
        region = get_object_or_404(Region, pk=pk)
        serializer = self.get_serializer(region)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None, *args, **kwargs) -> Response:
        region = get_object_or_404(Region, pk=pk)
        serializer = self.get_serializer(region, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None, *args, **kwargs) -> Response:
        region = get_object_or_404(Region, pk=pk)
        serializer = self.get_serializer(region, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None, *args, **kwargs) -> Response:
        region = get_object_or_404(Region, pk=pk)
        region.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(
        detail=True,
        methods=["get"],
    )
    def get_regions_by_country_alpha_2(
        self, request, pk=None, *args, **kwargs
    ) -> Response:
        regions = Region.objects.filter(country__alpha_2=pk)
        serializer = self.get_serializer(regions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
