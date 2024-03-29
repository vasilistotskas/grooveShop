from __future__ import annotations

from backend.core.filters.custom_filters import PascalSnakeCaseOrderingFilter
from backend.tip.models import Tip
from backend.tip.paginators import TipPagination
from backend.tip.serializers import TipSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.filters import SearchFilter
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


class TipViewSet(ModelViewSet):
    queryset = Tip.objects.all()
    serializer_class = TipSerializer
    pagination_class = TipPagination
    filter_backends = [DjangoFilterBackend, PascalSnakeCaseOrderingFilter, SearchFilter]
    filterset_fields = ["id", "title", "kind", "active"]
    ordering_fields = ["id", "title", "kind", "active", "created_at"]
    ordering = ["id"]
    search_fields = ["id", "title"]

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
        tip = get_object_or_404(Tip, pk=pk)
        serializer = self.get_serializer(tip)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None, *args, **kwargs) -> Response:
        tip = get_object_or_404(Tip, pk=pk)
        serializer = self.get_serializer(tip, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None, *args, **kwargs) -> Response:
        tip = get_object_or_404(Tip, pk=pk)
        serializer = self.get_serializer(tip, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None, *args, **kwargs) -> Response:
        tip = get_object_or_404(Tip, pk=pk)
        tip.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
