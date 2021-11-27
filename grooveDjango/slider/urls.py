from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns

from slider import views

urlpatterns = [
    path('sliders/all/', views.AllSliders.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)