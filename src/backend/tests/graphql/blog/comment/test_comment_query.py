from backend.blog.models import Author
from backend.blog.models import Category
from backend.blog.models import Comment
from backend.blog.models import Post
from backend.tests.graphql.base import GRAPHQLBaseTestClass
from django.contrib.auth import get_user_model

User = get_user_model()


class CommentQueryTest(GRAPHQLBaseTestClass):
    user = None
    author: Author
    category: Category
    post: Post
    comment: Comment

    def setUp(self):
        self.user = User.objects.create_user(password="bar", email="email@email.com")
        self.author = Author.objects.create(
            user_id=self.user.id, website="https://www.google.com", bio="bio"
        )
        self.category = Category.objects.create(
            name="name", slug="slug", description="description"
        )
        self.post = Post.objects.create(
            title="title",
            subtitle="subtitle",
            category_id=self.category.id,
            author_id=self.author.id,
        )
        self.comment = Comment.objects.create(
            content="content", post_id=self.post.id, user_id=self.user.id
        )
        super(CommentQueryTest, self).setUp()

    def test_comments_by_post(self):
        post_id = self.post.id
        comment = self.comment

        query = """
        query {
          commentsByPost(postId: %s) {
            content
            post {
              id
            }
            user {
              id
            }
          }
        }
        """ % (
            post_id,
        )

        response_data = self.make_query(query)

        comment_content = response_data["data"]["commentsByPost"][0]["content"]
        post_id = response_data["data"]["commentsByPost"][0]["post"]["id"]
        user_id = response_data["data"]["commentsByPost"][0]["user"]["id"]

        self.assertEqual(comment_content, comment.content)
        self.assertEqual(post_id, str(comment.post_id))
        self.assertEqual(user_id, str(comment.user_id))

    def test_comments_by_user(self):
        user_email = self.user.email
        comment = self.comment

        query = """
        query {
          commentsByUser(userEmail: "%s") {
            content
            post {
              id
            }
            user {
              id
            }
          }
        }
        """ % (
            user_email,
        )

        response_data = self.make_query(query)

        print('response_data["data"]', response_data["data"])

        comment_content = response_data["data"]["commentsByUser"][0]["content"]
        post_id = response_data["data"]["commentsByUser"][0]["post"]["id"]
        user_id = response_data["data"]["commentsByUser"][0]["user"]["id"]

        self.assertEqual(comment_content, comment.content)
        self.assertEqual(post_id, str(comment.post_id))
        self.assertEqual(user_id, str(comment.user_id))

    def test_comment_by_user_to_post(self):
        user_email = self.user.email
        post_id = self.post.id
        comment = self.comment

        query = """
        query {
          commentByUserToPost(postId: %s, userEmail: "%s") {
            content
            post {
              id
            }
            user {
              id
            }
          }
        }
        """ % (
            post_id,
            user_email,
        )

        response_data = self.make_query(query)

        print('response_data["data"]', response_data["data"])

        comment_content = response_data["data"]["commentByUserToPost"]["content"]
        post_id = response_data["data"]["commentByUserToPost"]["post"]["id"]
        user_id = response_data["data"]["commentByUserToPost"]["user"]["id"]

        self.assertEqual(comment_content, comment.content)
        self.assertEqual(post_id, str(comment.post_id))
        self.assertEqual(user_id, str(comment.user_id))
