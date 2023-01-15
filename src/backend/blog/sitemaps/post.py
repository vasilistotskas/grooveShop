from backend.blog.models.post import BlogPost
from django.contrib.sitemaps import Sitemap


class BlogPostSitemap(Sitemap):
    changefreq = "weekly"
    priority = 1.0

    def items(self):
        return BlogPost.objects.filter(status="published")

    def lastmod(self, obj: BlogPost):
        return obj.updated_at

    def location(self, obj: BlogPost):
        return obj.absolute_url
