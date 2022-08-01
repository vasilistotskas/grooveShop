import strawberry
from backend.blog.models import Post
from strawberry_django_plus import gql
from django.contrib.auth import get_user_model

User = get_user_model()


@strawberry.django.filters.filter(Post)
class PostBySlugFilter:
    slug: str

    def filter(self, queryset):
        return (
            Post.objects.prefetch_related("tags")
            .select_related("author")
            .get(slug=self.slug)
        )


@strawberry.django.filters.filter(Post)
class PostsByAuthorFilter:
    email: str

    def filter(self, queryset):
        return (
            Post.objects.prefetch_related("tags")
            .select_related("author")
            .filter(author__user__email=self.email)
        )


@strawberry.django.filters.filter(Post)
class PostsByAuthorTag:
    tag: str

    def filter(self, queryset):
        return (
            Post.objects.prefetch_related("tags")
            .select_related("author")
            .filter(tags__name__iexact=self.tag)
        )


@strawberry.django.filters.filter(Post)
class UpdatePostLikesFilter:
    id: gql.ID
    user_id: gql.ID

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

