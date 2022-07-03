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
from django.views import View
from django.contrib import admin
from django.conf import settings
from django.shortcuts import render
from django.urls import path, include
from django.conf.urls.static import static
from django.middleware.csrf import get_token
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


class IndexView(View):
    template_name = 'dist/index.html'

    def get(
            self,
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

        to_render = {
            'SiteTitle': 'DeepWeb'
        }

        return render(request, "dist/index.html", to_render)


class OfflineView(View):
    template_name = 'dist/offline.html'

    def get(
            self,
            request
    ):
        get_token(request)

        return render(request, "dist/offline.html")


def error_400(request, exception):
    context = {}
    response = render(request, 'dist/index.html', context=context)
    response.status_code = 400
    return response


def error_403(request, exception):
    context = {}
    response = render(request, 'dist/index.html', context=context)
    response.status_code = 403
    return response


def error_404(request, exception):
    context = {}
    response = render(request, 'dist/index.html', context=context)
    response.status_code = 404
    return response


def error_500(request):
    context = {}
    response = render(request, 'dist/index.html', context=context)
    response.status_code = 500
    return response


handler400 = error_400
handler403 = error_403
handler404 = error_404
handler500 = error_500

front_urls = [
    path('', IndexView.as_view(), name='index'),
    path('index.html', IndexView.as_view(), name='index'),
    path('manifest.json', IndexView.as_view(), name='index'),
    path('robots.txt', IndexView.as_view(), name='index'),
    path('offline/', OfflineView.as_view(), name='offline'),
    path('log-in', IndexView.as_view(), name='index'),
    path('sign-up', IndexView.as_view(), name='index'),
    path('accounts/activate/<uid>/<token>', IndexView.as_view(), name='index'),
    path('accounts/activate/verify_mail_resend', IndexView.as_view(), name='index'),
    path('password_reset', IndexView.as_view(), name='index'),
    path('password-reset', IndexView.as_view(), name='index'),
    path('password_reset/<uid>/<token>', IndexView.as_view(), name='index'),
    path('password-reset/<uid>/<token>', IndexView.as_view(), name='index'),
    path('user-account', IndexView.as_view(), name='index'),
    path('user-account/orders', IndexView.as_view(), name='index'),
    path('user-account/settings', IndexView.as_view(), name='index'),
    path('user-account/favourites', IndexView.as_view(), name='index'),
    path('user-account/reviews', IndexView.as_view(), name='index'),
    path('user-account/password', IndexView.as_view(), name='index'),
    path('search', IndexView.as_view(), name='index'),
    path('cart', IndexView.as_view(), name='index'),
    path('cart/success', IndexView.as_view(), name='index'),
    path('cart/checkout', IndexView.as_view(), name='index'),
    path('products/all', IndexView.as_view(), name='index'),
    path('product/<category_slug>/<product_slug>', IndexView.as_view(), name='index'),
    path('category/<category_slug>', IndexView.as_view(), name='index'),
    path('blog', IndexView.as_view(), name='index'),
    path('author/<username>', IndexView.as_view(), name='index'),
    path('post/<slug>', IndexView.as_view(), name='index'),
    path('tag/<tag>', IndexView.as_view(), name='index'),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('backend.product.urls')),
    path('api/v1/', include('backend.order.urls')),
    path('api/v1/', include('backend.user.urls')),
    path('api/v1/', include('backend.slider.urls')),
    path('api/v1/', include('backend.search.urls')),
    path('api/v1/', include('backend.blog.urls')),
    # djoser api views
    path('api/v1/djoser/', include('djoser.urls')),
    path('api/v1/djoser/', include('djoser.urls.authtoken')),
    # graphql
    path('graphql', csrf_exempt(GraphQLView.as_view(graphiql=True))),
    # admin html editor
    path('tinymce/', include('tinymce.urls')),
    # vue urls
    path('', include(front_urls)),
    path('', include('pwa.urls'))
]

urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT,
)
urlpatterns += staticfiles_urlpatterns()

