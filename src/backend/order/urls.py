from backend.order import views
from django.urls import path

urlpatterns = [
    path("checkout/", views.Checkout.as_view()),
    path("orders/", views.UserOrdersList.as_view()),
]
