import stripe
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import authentication
from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .enum.pay_way_enum import PayWayEnum
from .models import Order
from .models import PayWay
from .paginators import *
from .serializers import OrderSerializer
from .serializers import PayWaySerializer
from .serializers import UserOrderSerializer

User = get_user_model()


class Checkout(APIView):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    pay_way = ""

    @staticmethod
    def decrease_product_stock(product) -> None:
        for item in product:
            quantity = item.get("quantity")
            product = item.get("product")
            product.stock -= quantity
            product.save(update_fields=["stock"])

    @staticmethod
    def calculate_order_total_amount(items) -> float:
        paid_amount = sum(
            item.get("quantity") * item.get("product").price for item in items
        )
        pay_way_cost = 0
        pay_way = PayWay.objects.get(name=PayWayEnum.CreditCard)
        if pay_way.free_for_order_amount > paid_amount:
            pay_way_cost = pay_way.cost
        paid_amount += pay_way_cost
        return paid_amount

    def create_order(self, request, paid_amount, serializer, items, pay_way_name):
        if pay_way_name == PayWayEnum.CreditCard:
            charge = stripe.Charge.create(
                amount=int(paid_amount * 100),
                currency="USD",
                description="Charge from grooveShop",
                source=serializer.validated_data["stripe_token"],
            )

        self.decrease_product_stock(items)

        if request.data.get("user_id"):
            user_id = request.data.get("user_id")
            user = User.objects.get(id=user_id)
            serializer.save(user=user, paid_amount=paid_amount)
        else:
            serializer.save(user=None, paid_amount=paid_amount)

    def post(self, request, format=None):
        serializer = OrderSerializer(data=request.data, context={"request": request})
        if serializer.is_valid(raise_exception=True):
            stripe.api_key = settings.STRIPE_SECRET_KEY
            items = serializer.validated_data["items"]
            paid_amount = self.calculate_order_total_amount(items=items)
            pay_way_name = serializer.validated_data["pay_way"]

            self.pay_way = PayWay.objects.get(name=pay_way_name)

            self.create_order(
                request=request,
                paid_amount=paid_amount,
                serializer=serializer,
                items=items,
                pay_way_name=pay_way_name,
            )
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserOrdersList(generics.ListAPIView):
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = UserOrderListPagination
    serializer_class = UserOrderSerializer

    def get_queryset(self):
        user = self.request.user
        return Order.objects.filter(user=user)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class PayWayList(generics.ListAPIView):
    serializer_class = PayWaySerializer

    def get_queryset(self):
        return PayWay.active_pay_ways_by_status(True)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
