import os
import sys
from pathlib import Path

import environ

env = environ.Env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Take environment variables from .env file
environ.Env.read_env(os.path.join(BASE_DIR.parent, ".env"))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get("SECRET_KEY")

# STRIPE_SECRET_KEY = 'pk_test_sDva2BtVWsc3nQzcqU5MEWDP008QiK6ae3'
STRIPE_SECRET_KEY = "sk_test_wKFGpTy9h1zpwqo0wNxRNlK400dNnJS7L5"
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = bool(int(os.environ.get("DEBUG", 0)))

if "celery" in sys.argv[0]:
    DEBUG = False

BACKEND_BASE_URL = str(os.environ.get("BACKEND_BASE_URL"))
APP_BASE_URL = str(os.environ.get("APP_BASE_URL"))
VITE_APP_URL = str(os.environ.get("VITE_APP_URL"))

ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    "http://localhost:8001",
    "http://localhost:3003",
    "backend",
    APP_BASE_URL,
    VITE_APP_URL,
]
ALLOWED_HOSTS.extend(
    filter(
        None,
        os.environ.get("ALLOWED_HOSTS", "").split(","),
    )
)

CORS_ORIGIN_ALLOW_ALL = False
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = [
    "http://localhost:8001",
    "http://localhost:3003",
    APP_BASE_URL,
    VITE_APP_URL,
]
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:8001",
    "http://localhost:3003",
    APP_BASE_URL,
    VITE_APP_URL,
]
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8001",
    "http://localhost:3003",
    APP_BASE_URL,
    VITE_APP_URL,
]

INTERNAL_IPS = [
    "127.0.0.1",
]


if DEBUG:
    import socket  # only if you haven't already imported this

    hostname, _, ips = socket.gethostbyname_ex(socket.gethostname())
    INTERNAL_IPS = [ip[: ip.rfind(".")] + ".1" for ip in ips] + [
        "127.0.0.1",
        "10.0.2.2",
    ]


# Application definition
DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",
]
PROJECT_APPS = [
    "backend.user",
    "backend.core",
    "backend.product",
    "backend.order",
    "backend.search",
    "backend.slider",
    "backend.blog",
    "backend.seo",
    "backend.tip",
    "backend.vat",
    "backend.country",
    "backend.region",
    "backend.pay_way",
    "backend.session",
]
THIRD_PARTY_APPS = [
    "rest_framework",
    "rest_framework.authtoken",
    "corsheaders",
    "mptt",
    "tinymce",
    "django_filters",
    "strawberry.django",
    "drf_spectacular",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.facebook",
    "allauth.socialaccount.providers.google",
    # Configure the django-otp package.
    "django_otp",
    "django_otp.plugins.otp_totp",
    "django_otp.plugins.otp_static",
    # Enable two-factor auth.
    "allauth_2fa",
]
INSTALLED_APPS = DJANGO_APPS + PROJECT_APPS + THIRD_PARTY_APPS

STRAWBERRY_DJANGO = {
    "FIELD_DESCRIPTION_FROM_HELP_TEXT": True,
    "TYPE_DESCRIPTION_FROM_MODEL_DOCSTRING": True,
}

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "backend.session.middleware.SessionTraceMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django_otp.middleware.OTPMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    # Reset login flow middleware. If this middleware is included, the login
    # flow is reset if another page is loaded between login and successfully
    # entering two-factor credentials.
    "allauth_2fa.middleware.AllauthTwoFactorMiddleware",
]

# Set the allauth adapter to be the 2FA adapter.
ACCOUNT_ADAPTER = "allauth_2fa.adapter.OTPAdapter"
ROOT_URLCONF = "backend.app.urls"

# Site info
SITE_NAME = "DeepWeb"
SITE_ID = 1

# Slash append
APPEND_SLASH = os.environ.get("APPEND_SLASH")

# User model
AUTH_USER_MODEL = "user.UserAccount"

# Sessions and Cookies
SESSION_ENGINE = "django.contrib.sessions.backends.cache"
CSRF_COOKIE_SAMESITE = "Strict"
SESSION_COOKIE_SAMESITE = "Strict"
CSRF_COOKIE_HTTPONLY = False  # False since we will grab it via universal-cookies
SESSION_COOKIE_HTTPONLY = True

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "backend/templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

AUTHENTICATION_BACKENDS = [
    # Needed to log in by username in Django admin, regardless of `allauth`
    "django.contrib.auth.backends.ModelBackend",
    # `allauth` specific authentication methods, such as login by e-mail
    "allauth.account.auth_backends.AuthenticationBackend",
]

SOCIALACCOUNT_PROVIDERS = {
    "facebook": {
        "METHOD": "oauth2",
        "SDK_URL": "//connect.facebook.net/{locale}/sdk.js",
        "SCOPE": ["email", "public_profile"],
        "AUTH_PARAMS": {"auth_type": "reauthenticate"},
        "INIT_PARAMS": {"cookie": True},
        "FIELDS": [
            "id",
            "first_name",
            "last_name",
            "middle_name",
            "name",
            "name_format",
            "picture",
            "short_name",
        ],
        "EXCHANGE_TOKEN": True,
        "VERIFIED_EMAIL": False,
        "LOCALE_FUNC": lambda request: "en_US",
        "VERSION": "v15.0",
        "GRAPH_API_URL": "https://graph.facebook.com/v15.0/",
    },
    "google": {
        "SCOPE": ["profile", "email"],
        "AUTH_PARAMS": {"access_type": "online"},
        "OAUTH_PKCE_ENABLED": True,
    },
}

ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_SIGNUP_REDIRECT_URL = "/user-account"
LOGIN_REDIRECT_URL = "/user-account"

WSGI_APPLICATION = "backend.app.wsgi.application"

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases
SYSTEM_ENV = os.environ.get("SYSTEM_ENV", None)

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "HOST": os.environ.get("DB_HOST"),
        "NAME": os.environ.get("DB_NAME"),
        "USER": os.environ.get("DB_USER"),
        "PASSWORD": os.environ.get("DB_PASS"),
    },
    "replica": {
        "ENGINE": "django.db.backends.postgresql",
        "HOST": os.environ.get("DB_HOST_TEST"),
        "NAME": os.environ.get("DB_NAME_TEST"),
        "TEST": {
            "MIRROR": os.environ.get("DB_TEST_MIRROR"),
        },
    },
}

if SYSTEM_ENV == "GITHUB_WORKFLOW":
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": "postgres",
            "USER": os.environ.get("DB_USER"),
            "PASSWORD": os.environ.get("DB_PASS"),
            "HOST": "127.0.0.1",
            "PORT": "5432",
        }
    }

# Cache
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://redis:6379/0",
        "OPTIONS": {"CLIENT_CLASS": "django_redis.client.DefaultClient"},
    }
}

# Celery
CELERY_BROKER_URL = "redis://redis:6379"
CELERY_RESULT_BACKEND = "redis://redis:6379"

# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = os.environ.get("LANGUAGE_CODE")
TIME_ZONE = os.environ.get("TIME_ZONE")
USE_I18N = os.environ.get("USE_I18N")
USE_L10N = os.environ.get("USE_L10N")
USE_TZ = os.environ.get("USE_TZ")

# Email Settings
EMAIL_BACKEND = os.environ.get("EMAIL_BACKEND")
EMAIL_HOST = os.environ.get("EMAIL_HOST")
EMAIL_PORT = os.environ.get("EMAIL_PORT")
EMAIL_HOST_USER = os.environ.get("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_HOST_PASSWORD")
EMAIL_USE_TLS = os.environ.get("EMAIL_USE_TLS")
DEFAULT_FROM_EMAIL = os.environ.get("DEFAULT_FROM_EMAIL")

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = "backend/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "backend/static")

MEDIA_URL = "backend/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "backend/media")

# Vue project location
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

STATICFILES_DIRS = (
    BASE_DIR.joinpath("frontend", "dist"),
    BASE_DIR.joinpath("files"),
)
STATICFILES_STORAGE = "whitenoise.storage.CompressedStaticFilesStorage"

# graphql schema
GRAPHENE = {
    "SCHEMA": "backend.core.schema.schema",
}

# Tinymce admin panel editor config
TINYMCE_DEFAULT_CONFIG = {
    "theme": "silver",
    "height": 500,
    "width": 960,
    "menubar": "file edit view insert format tools table help",
    "plugins": "advlist,autolink,lists,link,image,charmap,print,preview,anchor,"
    "searchreplace,visualblocks,code,fullscreen,insertdatetime,media,table,paste,"
    "code,help,wordcount",
    "toolbar": "undo redo | formatselect | "
    "bold italic backcolor | alignleft aligncenter "
    "alignright alignjustify | bullist numlist outdent indent | "
    "removeformat | code | help",
}

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

REST_FRAMEWORK = {
    "DEFAULT_FILTER_BACKENDS": ["django_filters.rest_framework.DjangoFilterBackend"],
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "COERCE_DECIMAL_TO_STRING": os.environ.get("COERCE_DECIMAL_TO_STRING"),
    "DEFAULT_PAGINATION_CLASS": "backend.helpers.paginator.CountPaginator",
    "PAGE_SIZE": 100,
}

SPECTACULAR_SETTINGS = {
    "TITLE": "GrooveShop API",
    "DESCRIPTION": "GrooveShop API",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
    "SERVE_PERMISSIONS": ["rest_framework.permissions.AllowAny"],
}

# logs
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "{levelname} {asctime} {module} {process:d} {thread:d} {message}",
            "style": "{",
        },
        "simple": {
            "format": "[%(asctime)s] %(levelname)s | %(funcName)s | %(name)s | %(message)s",
            "datefmt": "%Y-%m-%d %H:%M:%S",
        },
    },
    "filters": {
        "require_debug_true": {
            "()": "django.utils.log.RequireDebugTrue",
        },
        "require_debug_false": {
            "()": "django.utils.log.RequireDebugFalse",
        },
    },
    "handlers": {
        "file": {
            "level": "ERROR",
            "filters": ["require_debug_true"],
            "class": "logging.FileHandler",
            "formatter": "simple",
            "filename": os.path.join(BASE_DIR, "logs/django.log"),
        },
        "console": {
            "level": "INFO",
            "filters": ["require_debug_true"],
            "class": "logging.StreamHandler",
            "stream": sys.stdout,
            "formatter": "verbose",
        },
        "logger": {
            "level": "DEBUG",
            "class": "logging.handlers.RotatingFileHandler",
            "filename": os.path.join(BASE_DIR, "logs/django.log"),
            "formatter": "simple",
        },
    },
    "loggers": {
        "django": {
            "handlers": ["console", "file"],
            "level": "DEBUG",
            "propagate": True,
        },
        "signal": {
            "handlers": ["logger"],
            "level": "DEBUG",
        },
    },
}
