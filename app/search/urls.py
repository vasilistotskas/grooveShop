from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from search import views

urlpatterns = [
    path('search/', views.Search.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)