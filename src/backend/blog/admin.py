from django.contrib import admin
from .models import Author, Post, Tag, Category, Comment


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
        "publish_date",
        "published",
    )
    list_filter = (
        "published",
        "publish_date",
    )
    list_editable = (
        "title",
        "subtitle",
        "slug",
        "publish_date",
        "published",
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
    date_hierarchy = "publish_date"
    save_on_top = True


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    model = Comment
    date_hierarchy = "created_at"
