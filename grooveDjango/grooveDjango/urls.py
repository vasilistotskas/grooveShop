from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('product.urls')),
    path('api/v1/', include('order.urls')),
    path('api/v1/', include('user.urls')),
    # djoser api views
    path('api/v1/djoser/', include('djoser.urls')),
    path('api/v1/djoser/', include('djoser.urls.authtoken')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
