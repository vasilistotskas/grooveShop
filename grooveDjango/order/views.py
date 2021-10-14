import stripe

from django.conf import settings
from django.contrib.auth.models import User
from django.http import Http404
from django.shortcuts import render

from rest_framework import status, authentication, permissions
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Order, OrderItem
from .serializers import OrderSerializer, MyOrderSerializer


def decreaseProductStock(product):
    for item in product:
        quantity = item.get('quantity')
        product = item.get('product')
        product.stock -= quantity
        product.save(update_fields=['stock'])


class Checkout(APIView):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def post(self, request, formate=None):
        serializer = OrderSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            stripe.api_key = settings.STRIPE_SECRET_KEY
            items = serializer.validated_data['items']
            paid_amount = sum(item.get('quantity') * item.get('product').price for item in items)

            try:
                charge = stripe.Charge.create(
                    amount=int(paid_amount * 100),
                    currency='USD',
                    description='Charge from grooveShop',
                    source=serializer.validated_data['stripe_token']
                )

                decreaseProductStock(items)

                if request.data.get('user_id'):
                    user_id = request.data.get('user_id')
                    user = User.objects.get(id=user_id)
                    serializer.save(user=user, paid_amount=paid_amount)
                else:
                    serializer.save(user=None, paid_amount=paid_amount)

                return Response(serializer.data, status=status.HTTP_201_CREATED)

            except Exception:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class OrdersList(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        orders = Order.objects.filter(user=request.user)
        serializer = MyOrderSerializer(orders, many=True)
        return Response(serializer.data)