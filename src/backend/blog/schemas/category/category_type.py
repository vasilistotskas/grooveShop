import os

import strawberry.django
import strawberry_django
from backend.blog.models import Category
from django.conf import settings
from strawberry import auto


@strawberry_django.type(Category)
class CategoryType:
    id: strawberry.ID
    name: str
    slug: auto
    description: str
    image: auto

    @strawberry_django.field
    def main_image_absolute_url(self) -> str:
        if self.image:
            image = settings.BACKEND_BASE_URL + self.image.url
        else:
            image = ""
        return image

    @strawberry_django.field
    def main_image_filename(self) -> str:
        if self.image:
            return os.path.basename(self.image.name)
        else:
            return ""
