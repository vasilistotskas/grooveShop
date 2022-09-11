import strawberry.django
from strawberry import auto
from backend.blog.models import Post
from django.contrib.auth import get_user_model

User = get_user_model()


@strawberry.django.filters.filter(Post)
class UpdatePostLikesFilter:
    id: strawberry.ID
    user_id: strawberry.ID

    def filter(self, queryset):
        post = Post.objects.get(pk=self.id)
        user = User.objects.get(id=self.user_id)
        liked = False
        if post.likes.contains(user):
            post.likes.remove(user)
        else:
            post.likes.add(user)
            liked = True
        post.save()
        # Notice we return an instance of this mutation
        return post

