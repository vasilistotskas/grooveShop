from backend.user import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    # AuthCore
    path("login/", views.login_view, name="api-login"),
    path("logout/", views.logout_view, name="api-logout"),
    path("session/", views.session_view, name="api-session"),
    path("session/clear_all/", views.ClearAllUserSessions.as_view()),
    path(
        "accounts/activate/<uid>/<token>/",
        views.ActivateUser.as_view({"get": "activation"}),
        name="activation",
    ),
    path(
        "accounts/resend_activation_mail/",
        views.ResendActivationView.as_view(),
        name="resend activation email",
    ),
    path("userprofile/<int:pk>/", views.UserProfileDetail.as_view()),
    path("userprofile/data/", views.UserProfileData.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
