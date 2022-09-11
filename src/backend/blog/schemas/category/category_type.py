import os
import strawberry.django
from strawberry import auto
from django.conf import settings
from backend.blog.models import Category


@strawberry.django.type(Category)
class CategoryType:
    id: auto
    name: str
    slug: auto
    description: str
    image: auto

    @strawberry.django.field
    def main_image_absolute_url(self) -> str:
        try:
            if self.id is not None:
                image = settings.BACKEND_BASE_URL + self.image.url
            else:
                image = ""
            return image
        except:
            return ""

    @strawberry.django.field
    def main_image_filename(self) -> str:
        try:
            return os.path.basename(self.image.name)
        except:
            return ""
