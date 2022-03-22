"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import logging
from django.contrib import admin
from django.conf import settings
from django.shortcuts import render
from django.urls import path, include
from django.conf.urls.static import static
from django.middleware.csrf import get_token
from graphene_django.views import GraphQLView
from django.views.decorators.gzip import gzip_page
from django.views.decorators.csrf import csrf_exempt
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


@gzip_page
def index_view(
        request,
        category_slug='None',
        product_slug='None',
        uid='None',
        token='None',
        username='None',
        slug='None',
        tag='None',
):
    get_token(request)
    return render(request, 'dist/index.html')


handler400 = index_view
handler403 = index_view
handler404 = index_view
handler500 = index_view

front_urls = [
    path('', index_view, name='index'),
    path('log-in', index_view, name='index'),
    path('sign-up', index_view, name='index'),
    path('accounts/activate/<uid>/<token>', index_view, name='index'),
    path('accounts/activate/verify_mail_resend', index_view, name='index'),
    path('password_reset', index_view, name='index'),
    path('password-reset', index_view, name='index'),
    path('password_reset/<uid>/<token>', index_view, name='index'),
    path('password-reset/<uid>/<token>', index_view, name='index'),
    path('user-account', index_view, name='index'),
    path('user-account/orders', index_view, name='index'),
    path('user-account/settings', index_view, name='index'),
    path('user-account/favourites', index_view, name='index'),
    path('user-account/reviews', index_view, name='index'),
    path('user-account/password', index_view, name='index'),
    path('search', index_view, name='index'),
    path('cart', index_view, name='index'),
    path('cart/success', index_view, name='index'),
    path('cart/checkout', index_view, name='index'),
    path('products/all', index_view, name='index'),
    path('product/<category_slug>/<product_slug>', index_view, name='index'),
    path('category/<category_slug>', index_view, name='index'),
    path('blog', index_view, name='index'),
    path('author/<username>', index_view, name='index'),
    path('post/<slug>', index_view, name='index'),
    path('tag/<tag>', index_view, name='index'),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('backend.product.urls')),
    path('api/v1/', include('backend.order.urls')),
    path('api/v1/', include('backend.user.urls')),
    path('api/v1/', include('backend.slider.urls')),
    path('api/v1/', include('backend.search.urls')),
    # djoser api views
    path('api/v1/djoser/', include('djoser.urls')),
    path('api/v1/djoser/', include('djoser.urls.authtoken')),
    # graphql
    path('graphql', csrf_exempt(GraphQLView.as_view(graphiql=True))),
    # admin html editor
    path('tinymce/', include('tinymce.urls')),
    # vue urls
    path('', include(front_urls)),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )
    urlpatterns += staticfiles_urlpatterns()