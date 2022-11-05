import strawberry.django
import strawberry_django
from backend.blog.models import Category


@strawberry_django.type(Category)
class CategoryType:
    id: strawberry.ID
    name: str
    slug: str
    description: str
    image: str
    main_image_absolute_url: str
    main_image_filename: str
