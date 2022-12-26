from typing import List

import strawberry.django
import strawberry_django
from backend.app import settings
from backend.blog.models.post import BlogPost
from backend.blog.schemas.author.author_type import AuthorType
from backend.blog.schemas.category.category_type import CategoryType
from backend.blog.schemas.tag.tag_type import TagType
from backend.user.schemas.user.user_account_type import UserAccountType
from strawberry import auto

User = settings.AUTH_USER_MODEL


@strawberry_django.type(BlogPost)
class PostType:
    id: strawberry.ID
    title: str
    subtitle: str
    slug: auto
    body: str
    meta_description: str
    created_at: auto
    updated_at: auto
    published_at: auto
    is_published: bool
    image: auto
    likes: List[UserAccountType]
    category: "CategoryType"
    tags: List[TagType]
    author: "AuthorType"
    main_image_absolute_url: str
    main_image_filename: str
    number_of_likes: int
