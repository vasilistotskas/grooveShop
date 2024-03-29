from __future__ import annotations

from backend.core.api.views import BaseExpandView
from backend.core.filters.custom_filters import PascalSnakeCaseOrderingFilter
from backend.product.models.favourite import ProductFavourite
from backend.product.paginators.favourite import ProductFavouritePagination
from backend.product.serializers.favourite import ProductFavouriteSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.filters import SearchFilter
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


class ProductFavouriteViewSet(BaseExpandView, ModelViewSet):
    queryset = ProductFavourite.objects.all()
    serializer_class = ProductFavouriteSerializer
    pagination_class = ProductFavouritePagination
    filter_backends = [DjangoFilterBackend, PascalSnakeCaseOrderingFilter, SearchFilter]
    filterset_fields = ["id", "user_id", "product_id"]
    ordering_fields = [
        "id",
        "user_id",
        "product_id",
        "created_at",
    ]
    ordering = ["id"]
    search_fields = [
        "id",
        "user_id",
        "product_id",
    ]

    def list(self, request, *args, **kwargs) -> Response:
        queryset = self.filter_queryset(self.get_queryset())

        # Check for 'pagination' query parameter
        pagination_param = request.query_params.get("pagination", "true")
        if pagination_param.lower() == "false":
            # Return non-paginated response
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        # Return paginated response
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
        favourite = get_object_or_404(ProductFavourite, id=pk)
        serializer = self.get_serializer(favourite)
        return Response(serializer.data)

    def update(self, request, pk=None, *args, **kwargs) -> Response:
        favourite = get_object_or_404(ProductFavourite, id=pk)
        serializer = self.get_serializer(favourite, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None, *args, **kwargs) -> Response:
        favourite = get_object_or_404(ProductFavourite, id=pk)
        serializer = self.get_serializer(favourite, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None, *args, **kwargs) -> Response:
        favourite = get_object_or_404(ProductFavourite, id=pk)
        favourite.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
