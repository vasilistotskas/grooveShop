import stripe
from .models import Order
from django.conf import settings
from rest_framework import generics
from rest_framework.views import APIView
from helpers.paginator import CountPaginator
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import OrderSerializer, MyOrderSerializer
from rest_framework import status, authentication, permissions

User = get_user_model()


class UserOrderListPagination(CountPaginator):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 3
    page_query_param = 'p'


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


class UserOrdersList(generics.ListCreateAPIView):
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = UserOrderListPagination
    serializer_class = MyOrderSerializer

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
