import strawberry.django
import strawberry_django
from backend.user.models import UserAccount


@strawberry_django.type(UserAccount)
class UserAccountType:
    id: strawberry.ID
    email: str
    first_name: str
    last_name: str
    is_active: bool
