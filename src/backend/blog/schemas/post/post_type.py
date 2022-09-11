import os
from typing import List
import strawberry.django
import strawberry_django
from strawberry import auto
from django.conf import settings
from backend.app import settings
from backend.blog.models import Post
from backend.blog.schemas.tag.tag_type import TagType
from backend.blog.schemas.author.author_type import AuthorType
from backend.blog.schemas.category.category_type import CategoryType
from backend.user.schemas.user.user_account_type import UserAccountType

User = settings.AUTH_USER_MODEL


@strawberry_django.type(Post)
class PostType:
    id: strawberry.ID
    title: str
    subtitle: str
    slug: auto
    body: str
    meta_description: str
    date_created: auto
    date_modified: auto
    publish_date: auto
    published: bool
    image: auto
    likes: List[UserAccountType]
    category: 'CategoryType'
    tags: List[TagType]
    author: 'AuthorType'

    @strawberry_django.field
    def main_image_absolute_url(self) -> str:
        try:
            if self.id is not None:
                image = settings.BACKEND_BASE_URL + self.image.url
            else:
                image = ""
            return image
        except:
            return ""

    @strawberry_django.field
    def main_image_filename(self) -> str:
        try:
            return os.path.basename(self.image.name)
        except:
            return ""

    @strawberry_django.field
    def number_of_likes(self) -> int:
        return self.likes.count()
