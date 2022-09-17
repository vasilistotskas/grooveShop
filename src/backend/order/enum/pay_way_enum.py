from enum import Enum


class PayWayEnum(str, Enum):
    CreditCard = "Credit Card"
    PayOnDelivery = "Pay On Delivery"
    PayOnStore = "Pay On Store"
    PayPal = "PayPal"
