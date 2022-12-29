from __future__ import annotations

from backend.pay_way.models import PayWay
from backend.pay_way.paginators import PayWayPagination
from backend.pay_way.serializers import PayWaySerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.filters import OrderingFilter
from rest_framework.filters import SearchFilter
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


class PayWayViewSet(ModelViewSet):
    queryset = PayWay.objects.all()
    serializer_class = PayWaySerializer
    pagination_class = PayWayPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = ["name", "active", "cost", "free_for_order_amount"]
    ordering_fields = ["name", "cost", "free_for_order_amount", "-created_at"]
    ordering = ["-created_at"]
    search_fields = ["name"]

    def list(self, request, *args, **kwargs) -> Response:
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = PayWaySerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = PayWaySerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs) -> Response | ValidationError:
        serializer = PayWaySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        raise ValidationError(serializer.errors)

    def retrieve(self, request, pk=None, *args, **kwargs) -> Response:
        pay_way = get_object_or_404(PayWay, pk=pk)
        serializer = PayWaySerializer(pay_way)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None, *args, **kwargs) -> Response | ValidationError:
        pay_way = get_object_or_404(PayWay, pk=pk)
        serializer = PayWaySerializer(pay_way, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return ValidationError(serializer.errors)

    def partial_update(
        self, request, pk=None, *args, **kwargs
    ) -> Response | ValidationError:
        pay_way = get_object_or_404(PayWay, pk=pk)
        serializer = PayWaySerializer(pay_way, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return ValidationError(serializer.errors)

    def destroy(self, request, pk=None, *args, **kwargs) -> Response:
        pay_way = get_object_or_404(PayWay, pk=pk)
        pay_way.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)