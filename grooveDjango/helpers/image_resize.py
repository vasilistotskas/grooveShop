from io import BytesIO
from PIL import Image
from django.core.files import File


def make_thumbnail(image, size):
    img = Image.open(image)
    img.convert('RGB')
    img.thumbnail(size)

    thumb_io = BytesIO()
    img.save(thumb_io, 'JPEG', quality=100)

    thumbnail = File(thumb_io, name=image.name)
    return thumbnail