from strawberry_django_plus import gql
from backend.user.models import UserAccount

@gql.django.type(UserAccount)
class UserAccountType:
    id: gql.ID
    email: str
    first_name: str
    last_name: str
    is_active: bool
