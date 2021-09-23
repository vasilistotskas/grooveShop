from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns

from product import views

urlpatterns = [
    path('latest-products/', views.LatestProductsList.as_view()),
    path('products/search/', views.Search.as_view()),

    path('products/<slug:category_slug>/<slug:product_slug>/', views.ProductDetail.as_view()),
    path('products/categories/', views.AllCategoriesList.as_view()),
    path('products/<slug:category_slug>/', views.CategoryDetail.as_view()),


    path('favouritelist/', views.FavouriteList.as_view()),
    path('favouriteitem/<int:favourites_id>/<int:product_id>', views.FavouriteDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)