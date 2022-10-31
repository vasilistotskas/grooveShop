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
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

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
]
PROJECT_APPS = [
    "backend.user",
    "backend.core",
    "backend.product",
    "backend.product_review",
    "backend.product_category",
    "backend.product_favourite",
    "backend.order",
    "backend.search",
    "backend.slider",
    "backend.blog",
    "backend.seo",
    "backend.tip",
    "backend.vat",
]
THIRD_PARTY_APPS = [
    "rest_framework",
    "rest_framework.authtoken",
    "corsheaders",
    "djoser",
    "mptt",
    "tinymce",
    "django_filters",
    "strawberry.django",
    "debug_toolbar",
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
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "debug_toolbar.middleware.DebugToolbarMiddleware",
]

ROOT_URLCONF = "backend.app.urls"

# Site info
SITE_NAME = "DeepWeb"
SITE_ID = 1

# Slash append
APPEND_SLASH = os.environ.get("APPEND_SLASH")

# User model
AUTH_USER_MODEL = "user.UserAccount"

# Sessions and Cookies
CSRF_COOKIE_SAMESITE = "Strict"
SESSION_COOKIE_SAMESITE = "Strict"
CSRF_COOKIE_HTTPONLY = False  # False since we will grab it via universal-cookies
SESSION_COOKIE_HTTPONLY = True

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR.joinpath("frontend")],
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

WSGI_APPLICATION = "backend.app.wsgi.application"

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases
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
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/3.2/topics/i18n/

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
# https://docs.djangoproject.com/en/3.2/howto/static-files/

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
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

REST_FRAMEWORK = {
    "DEFAULT_FILTER_BACKENDS": ["django_filters.rest_framework.DjangoFilterBackend"],
    "COERCE_DECIMAL_TO_STRING": os.environ.get("COERCE_DECIMAL_TO_STRING"),
}

DJOSER = {
    "LOGIN_FIELD": "email",
    "USER_CREATE_PASSWORD_RETYPE": True,
    "USERNAME_CHANGED_EMAIL_CONFIRMATION": True,
    "PASSWORD_CHANGED_EMAIL_CONFIRMATION": True,
    "SEND_CONFIRMATION_EMAIL": True,
    "SET_USERNAME_RETYPE": True,
    "SET_PASSWORD_RETYPE": True,
    "PASSWORD_RESET_CONFIRM_URL": "password_reset/{uid}/{token}",
    "USERNAME_RESET_CONFIRM_URL": "accounts/email/reset/confirm/{uid}/{token}",
    "ACTIVATION_URL": "accounts/activate/{uid}/{token}",
    "SEND_ACTIVATION_EMAIL": True,
    "SERIALIZERS": {
        "user_create": "backend.user.serializers.UserCreationSerializer",
        "user": "backend.user.serializers.UserCreationSerializer",
        "current_user": "backend.user.serializers.UserCreationSerializer",
        "user_delete": "djoser.serializers.UserDeleteSerializer",
    },
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
