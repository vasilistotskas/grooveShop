from strawberry_django_plus import gql
from backend.blog.models import Author
from backend.user.schemas.user.user_account_type import UserAccountType


@gql.django.type(Author)
class AuthorType:
    id: gql.ID
    user: 'UserAccountType'
    website: gql.auto
    bio: str
