from enum import Enum
from enum import unique


@unique
class PayWayEnum(Enum):
    CreditCard = "Credit Card"
    PayOnDelivery = "Pay On Delivery"
    PayOnStore = "Pay On Store"
    PayPal = "PayPal"

    @classmethod
    def choices(cls):
        return [(name.value, name.name) for name in cls]
