import strawberry.django
import strawberry_django
from backend.blog.models import Post
from django.contrib.auth import get_user_model

User = get_user_model()


@strawberry_django.filters.filter(Post)
class UpdatePostLikesFilter:
    id: strawberry.ID
    user_id: strawberry.ID

    def filter(self, queryset):
        post = Post.objects.get(pk=self.id)
        user = User.objects.get(id=self.user_id)
        if post.likes.contains(user):
            post.likes.remove(user)
        else:
            post.likes.add(user)
        post.save()
        # Notice we return an instance of this mutation
        return post
