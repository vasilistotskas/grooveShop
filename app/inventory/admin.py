from django.contrib import admin
from .models import Category, Product, Brand, ProductAttribute, ProductType, ProductAttributeValue, ProductInventory, Media, Stock, ProductAttributeValues, ProductTypeAttribute

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Brand)
admin.site.register(ProductAttribute)
admin.site.register(ProductType)
admin.site.register(ProductAttributeValue)
admin.site.register(ProductInventory)
admin.site.register(Media)
admin.site.register(Stock)
admin.site.register(ProductAttributeValues)
admin.site.register(ProductTypeAttribute)


