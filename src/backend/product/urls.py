from django.urls import path
from backend.product import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('latest-products/', views.LatestProductsList.as_view()),

    path('products/all/', views.ProductsAllResults.as_view()),
    path('products/<slug:category_slug>/<slug:product_slug>/', views.ProductDetail.as_view()),

    path('categories/categoriesTree/', views.CategoryTreeView.as_view()),
    path('categories/categoriesUnorganized/', views.CategoriesUnorganized.as_view()),
    path('categories/<slug:category_slug>/', views.CategoryDetail.as_view()),
    path('category_products/<slug:category_slug>/', views.CategoryProductsList.as_view()),

    path('favourites/<int:user_id>/', views.FavouriteUserListIds.as_view()),
    path('favourites/delete/<int:user_id>/<int:product_id>/', views.FavouriteDelete.as_view()),
    path('favourites/products/<int:user_id>/', views.FavouriteUserProductList.as_view()),

    # all Reviews of current product , get and post
    path('reviews/product/<int:product_id>/', views.ProductReviews.as_view()),

    # all Reviews of current user , get
    path('reviews/user/<int:user_id>/', views.UserReviews.as_view()),

    # specific Reviews based on user and product , delete and update
    path('reviews/review/<int:user_id>/<int:product_id>/', views.UserToProductReview.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)