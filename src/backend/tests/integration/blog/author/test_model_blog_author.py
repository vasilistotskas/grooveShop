from backend.blog.models import Author
from django.contrib.auth import get_user_model
from django.test import TestCase

User = get_user_model()


class BlogAuthorTestCase(TestCase):
    author: Author

    def setUp(self):
        user = User.objects.create_user(password="bar", email="email@email.com")
        self.author = Author.objects.create(
            user_id=user.id, website="https://www.google.com", bio="bio"
        )

    def test___str__(self):
        user_email = self.author.user.email
        self.assertEqual(str(self.author), user_email)
