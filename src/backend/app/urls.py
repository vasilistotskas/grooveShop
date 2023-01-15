from backend.core.graphql.schema import schema
from backend.session.views import ActiveUserViewSet
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.http import HttpResponse
from django.urls import include
from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET
from drf_spectacular.views import SpectacularAPIView
from drf_spectacular.views import SpectacularRedocView
from drf_spectacular.views import SpectacularSwaggerView
from rest_framework import routers
from strawberry.django.views import AsyncGraphQLView
from strawberry.django.views import GraphQLView


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

router = routers.SimpleRouter()
router.register(r"active_users", ActiveUserViewSet, basename="active_users")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include(router.urls)),
    path("api/v1/", include("backend.product.urls")),
    path("api/v1/", include("backend.order.urls")),
    path("api/v1/", include("backend.user.urls")),
    path("api/v1/", include("backend.country.urls")),
    path("api/v1/", include("backend.region.urls")),
    path("api/v1/", include("backend.slider.urls")),
    path("api/v1/", include("backend.search.urls")),
    path("api/v1/", include("backend.tip.urls")),
    path("api/v1/", include("backend.blog.urls")),
    path("api/v1/", include("backend.vat.urls")),
    path("api/v1/", include("backend.pay_way.urls")),
    path("api/v1/", include("backend.session.urls")),
    path("api/v1/", include("backend.cart.urls")),
    path("accounts/", include("allauth_2fa.urls")),
    path("accounts/", include("allauth.urls")),
    path("graphql/async", AsyncGraphQLView.as_view(schema=schema)),
    path("graphql/", csrf_exempt(GraphQLView.as_view(graphiql=True, schema=schema))),
    # admin html editor
    path("tinymce/", include("tinymce.urls")),  # vue urls
    # Spectacular
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    # Optional UI:
    path(
        "api/schema/swagger-ui/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "api/schema/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
    path("", include(front_urls)),
]

urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT,
)
urlpatterns += staticfiles_urlpatterns()
