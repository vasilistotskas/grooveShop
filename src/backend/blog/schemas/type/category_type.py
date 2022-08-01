import os
from django.conf import settings
from strawberry_django_plus import gql
from backend.blog.models import Category


@gql.django.type(Category)
class CategoryType:
    id: gql.ID
    name: str
    slug: gql.auto
    description: str
    image: gql.auto

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
