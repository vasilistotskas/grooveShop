import strawberry.django
import strawberry_django
from backend.blog.models.author import BlogAuthor
from backend.user.schemas.user.user_account_type import UserAccountType
from strawberry import auto


@strawberry_django.type(BlogAuthor)
class AuthorType:
    id: strawberry.ID
    user: "UserAccountType"
    website: auto
    bio: str
