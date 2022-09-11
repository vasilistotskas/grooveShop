import strawberry.django
from strawberry import auto
from backend.user.models import UserAccount


@strawberry.django.type(UserAccount)
class UserAccountType:
    id: strawberry.ID
    email: str
    first_name: str
    last_name: str
    is_active: bool
