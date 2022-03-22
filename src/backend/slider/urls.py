from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from backend.slider import views

urlpatterns = [
    path('sliders/all/', views.AllSliders.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)