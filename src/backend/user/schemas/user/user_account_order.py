import strawberry_django
from backend.user.models import UserAccount
from strawberry import auto


@strawberry_django.ordering.order(UserAccount)
class UserAccountOrder:
    name: auto
