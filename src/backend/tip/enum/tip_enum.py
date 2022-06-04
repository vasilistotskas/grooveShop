from enum import Enum


class TipTypeEnum(str, Enum):
    CreditCard = 'Credit Card'
    PayOnDelivery = 'Pay On Delivery'
    PayOnStore = 'Pay On Store'
    PayPal = 'PayPal'
