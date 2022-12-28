from backend.user import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    # AuthCore
    path("session/", views.session_view, name="api-session"),
    path("session/clear_all/", views.ClearAllUserSessions.as_view()),
    path("userprofile/<int:pk>/", views.UserProfileDetail.as_view()),
    path("userprofile/data/", views.UserProfileData.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
