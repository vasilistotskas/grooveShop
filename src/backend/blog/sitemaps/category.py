from backend.blog.models.category import BlogCategory
from django.contrib.sitemaps import Sitemap


class BlogCategorySitemap(Sitemap):
    changefreq = "weekly"
    priority = 1.0

    def items(self):
        return BlogCategory.objects.all()

    def lastmod(self, obj: BlogCategory):
        return obj.created_at

    def location(self, obj: BlogCategory):
        return obj.absolute_url
