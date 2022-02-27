from django.urls import path
from backend.order import views

urlpatterns = [
    path('checkout/', views.Checkout.as_view()),
    path('orders/', views.UserOrdersList.as_view()),
    path('payway/', views.PayWayList.as_view()),
]