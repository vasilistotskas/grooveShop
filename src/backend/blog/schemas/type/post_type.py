import os
from typing import List
from django.conf import settings
from backend.app import settings
from backend.blog.models import Post
from strawberry_django_plus import gql
from backend.blog.schemas.type.tag_type import TagType
from backend.blog.schemas.type.author_type import AuthorType
from backend.blog.schemas.type.category_type import CategoryType
from backend.user.schemas.type.user_account_type import UserAccountType

User = settings.AUTH_USER_MODEL


@gql.django.type(Post)
class PostType:
    id: gql.ID
    title: str
    subtitle: str
    slug: gql.auto
    body: str
    meta_description: str
    date_created: gql.auto
    date_modified: gql.auto
    publish_date: gql.auto
    published: bool
    image: gql.auto
    likes: List[UserAccountType]
    category: 'CategoryType'
    tags: List[TagType]
    author: 'AuthorType'

    @gql.django.field
    def main_image_absolute_url(self) -> str:
        try:
            if self.id is not None:
                image = settings.APP_BASE_URL + self.image.url
            else:
                image = ""
            return image
        except:
            return ""

    @gql.django.field
    def main_image_filename(self) -> str:
        try:
            return os.path.basename(self.image.name)
        except:
            return ""

    @gql.django.field
    def number_of_likes(self) -> int:
        return self.likes.count()
