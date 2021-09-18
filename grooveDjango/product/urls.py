from django.urls import path, include

from product import views

urlpatterns = [
    path('latest-products/', views.LatestProductsList.as_view()),
    path('products/search/', views.search),

    path('products/<slug:category_slug>/<slug:product_slug>/', views.ProductDetail.as_view()),
    path('products/categories/', views.AllCategoriesList.as_view()),
    path('products/<slug:category_slug>/', views.CategoryDetail.as_view()),

    path('favourites/', views.FavouriteList.as_view()),
    path('favourites/user/<int:id>', views.FavouriteUserDetail.as_view()),
    path('favourites/<int:favourites_id>/favourite_item/<int:id>', views.FavouriteItemDetail.as_view()),
]