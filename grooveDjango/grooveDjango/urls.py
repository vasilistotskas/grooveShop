from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('product.urls')),
    path('api/v1/', include('order.urls')),
    path('api/v1/', include('user.urls')),
    path('api/v1/', include('slider.urls')),
    # djoser api views
    path('api/v1/djoser/', include('djoser.urls')),
    path('api/v1/djoser/', include('djoser.urls.authtoken')),
    # graphql
    path('graphql', csrf_exempt(GraphQLView.as_view(graphiql=True))),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
