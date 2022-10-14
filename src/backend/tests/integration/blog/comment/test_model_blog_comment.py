from backend.blog.models import Author
from backend.blog.models import Category
from backend.blog.models import Comment
from backend.blog.models import Post
from django.contrib.auth import get_user_model
from django.test import TestCase

User = get_user_model()


class BlogCommentTestCase(TestCase):
    content = "content"

    def setUp(self):
        user = User.objects.create_user(password="bar", email="email@email.com")
        category = Category.objects.create(
            name="name", slug="slug", description="description"
        )
        author = Author.objects.create(
            user_id=user.id, website="https://www.google.com", bio="bio"
        )
        post = Post.objects.create(
            title="title",
            subtitle="subtitle",
            category_id=category.id,
            author_id=author.id,
        )
        Comment.objects.create(content=self.content, post_id=post.id)

    def test___str__(self):
        post_id = Post.objects.get(title="title").id
        comment = Comment.objects.get(post_id=post_id)
        self.assertEqual(str(comment), comment.content)

    def test_number_of_likes(self):
        post_id = Post.objects.get(title="title").id
        comment = Comment.objects.get(post_id=post_id)
        self.assertEqual(comment.number_of_likes(), 0)


class WithContentBiggerThanFifty(BlogCommentTestCase):
    content = (
        "content content content content content content content content"[:50] + "..."
    )
