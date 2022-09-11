import strawberry.django
from strawberry import auto
from backend.blog.models import Author
from backend.user.schemas.user.user_account_type import UserAccountType


@strawberry.django.type(Author)
class AuthorType:
    id: auto
    user: 'UserAccountType'
    website: auto
    bio: str
