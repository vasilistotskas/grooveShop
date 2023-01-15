from backend.product.models.product import Product
from django.contrib.sitemaps import Sitemap


class ProductSitemap(Sitemap):
    changefreq = "weekly"
    priority = 1.0

    def items(self):
        return Product.objects.filter(active=True)

    def lastmod(self, obj: Product):
        return obj.updated_at

    def location(self, obj: Product):
        return obj.absolute_url
