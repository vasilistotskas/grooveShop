FROM python:3.9-alpine3.13
LABEL maintainer="groove.com"

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

COPY ./requirements.txt /requirements.txt
COPY ./app /app
COPY ./scripts /scripts

WORKDIR /app

RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    apk add --update --no-cache postgresql-client && \
    apk add --update --no-cache libffi-dev && \
    apk add --update --no-cache jpeg-dev zlib-dev && \
    apk add --update --no-cache --virtual .tmp-deps \
        build-base postgresql-dev musl-dev linux-headers && \
    /py/bin/pip install -r /requirements.txt && \
    apk del .tmp-deps && \
    adduser --disabled-password --no-create-home app && \
    mkdir -p /app/static && \
    mkdir -p /app/media && \
    mkdir -p /app/files && \
    mkdir -p /app/logs && \
    chown -R app:app /app && \
    chmod -R 755 /app && \
    chmod -R +x /scripts

ENV PATH="/scripts:/py/bin:$PATH"
ENV LIBRARY_PATH=/lib:/usr/lib

USER app

#CMD ["run.sh"]