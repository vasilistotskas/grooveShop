from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.http import HttpResponse
from django.urls import include
from django.urls import path
from django.views.decorators.http import require_GET


@require_GET
def robots_txt(request):
    lines = [
        "User-Agent: *",
        "Disallow: /private/",
        "Disallow: /junk/",
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain")


front_urls = [
    path("robots.txt", robots_txt),
]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include("backend.product.urls")),
    path("api/v1/", include("backend.product_favourite.urls")),
    path("api/v1/", include("backend.product_category.urls")),
    path("api/v1/", include("backend.product_review.urls")),
    path("api/v1/", include("backend.order.urls")),
    path("api/v1/", include("backend.user.urls")),
    path("api/v1/", include("backend.slider.urls")),
    path("api/v1/", include("backend.search.urls")),
    path("api/v1/", include("backend.tip.urls")),  # djoser api views
    path("api/v1/djoser/", include("djoser.urls")),
    path("api/v1/djoser/", include("djoser.urls.authtoken")),
    # admin html editor
    path("tinymce/", include("tinymce.urls")),  # vue urls
    path("", include(front_urls)),  # debug toolbar
    path("__debug__/", include("debug_toolbar.urls")),
]

urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT,
)
urlpatterns += staticfiles_urlpatterns()
