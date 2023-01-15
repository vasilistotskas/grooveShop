from backend.blog.models.author import BlogAuthor
from django.contrib.sitemaps import Sitemap


class BlogAuthorSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.5

    def items(self):
        return BlogAuthor.objects.all()

    def lastmod(self, obj: BlogAuthor):
        return obj.created_at

    def location(self, obj: BlogAuthor):
        return obj.absolute_url
