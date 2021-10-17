from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns

from product import views

urlpatterns = [
    path('latest-products/', views.LatestProductsList.as_view()),
    path('products/search/', views.Search.as_view()),

    path('products/<slug:category_slug>/<slug:product_slug>/', views.ProductDetail.as_view()),
    path('products/categories/', views.AllCategoriesList.as_view()),
    path('products/<slug:category_slug>/', views.CategoryDetail.as_view()),

    path('favourites/<int:user_id>/', views.FavouriteList.as_view()),
    path('favourites/delete/<int:user_id>/<int:product_id>/', views.FavouriteDelete.as_view()),

    path('comments/product/<int:product_id>/', views.ProductComments.as_view()),
    path('comments/user/<int:user_id>/', views.UserComments.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)