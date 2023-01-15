from backend.product.models.category import ProductCategory
from django.contrib.sitemaps import Sitemap


class ProductCategorySitemap(Sitemap):
    changefreq = "weekly"
    priority = 1.0

    def items(self):
        return ProductCategory.objects.all()

    def lastmod(self, obj: ProductCategory):
        return obj.updated_at

    def location(self, obj: ProductCategory):
        return obj.absolute_url
