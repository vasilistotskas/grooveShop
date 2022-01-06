from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from inventory import views

urlpatterns = [
    path('inventory/category/all/', views.CategoryAllResults.as_view()),
    path('inventory/product/all/', views.ProductAllResults.as_view()),
    path('inventory/brand/all/', views.BrandAllResults.as_view()),
    path('inventory/product_attribute/all/', views.ProductAttributeAllResults.as_view()),
    path('inventory/product_type/all/', views.ProductTypeAllResults.as_view()),
    path('inventory/product_attribute_value/all/', views.ProductAttributeValueAllResults.as_view()),
    path('inventory/product_inventory/all/', views.ProductInventoryAllResults.as_view()),
    path('inventory/media/all/', views.MediaAllResults.as_view()),
    path('inventory/stock/all/', views.StockAllResults.as_view()),
    path('inventory/product_attribute_values/all/', views.ProductAttributeValuesAllResults.as_view()),
    path('inventory/product_type+attribute/all/', views.ProductTypeAttributeAllResults.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)