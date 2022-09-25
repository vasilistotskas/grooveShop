from backend.blog.models import Author
from backend.blog.models import Category
from backend.blog.models import Comment
from backend.blog.models import Post
from backend.blog.models import Tag
from django.contrib import admin


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    model = Author


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    model = Tag


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    model = Category


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    model = Post

    list_display = (
        "id",
        "title",
        "subtitle",
        "slug",
        "published_at",
        "is_published",
    )
    list_filter = (
        "is_published",
        "published_at",
    )
    list_editable = (
        "title",
        "subtitle",
        "slug",
        "published_at",
        "is_published",
    )
    search_fields = (
        "title",
        "subtitle",
        "slug",
        "body",
    )
    prepopulated_fields = {
        "slug": (
            "title",
            "subtitle",
        )
    }
    date_hierarchy = "published_at"
    save_on_top = True


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    model = Comment
    date_hierarchy = "created_at"
