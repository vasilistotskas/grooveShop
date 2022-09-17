import strawberry.django
import strawberry_django
from backend.blog.models import Author
from backend.user.schemas.user.user_account_type import UserAccountType
from strawberry import auto


@strawberry_django.type(Author)
class AuthorType:
    id: strawberry.ID
    user: "UserAccountType"
    website: auto
    bio: str
