FROM python:3.9-alpine3.13
LABEL maintainer="groove.com"

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

COPY ./requirements.txt /requirements.txt
COPY ./src /src
COPY ./scripts /scripts

WORKDIR /src

RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    apk add --update --no-cache postgresql-client && \
    apk add --update --no-cache libffi-dev && \
    apk add --update --no-cache jpeg-dev zlib-dev && \
    apk add --update --no-cache --virtual .tmp-deps \
        build-base postgresql-dev musl-dev linux-headers && \
    /py/bin/pip install -r /requirements.txt && \
    apk del .tmp-deps && \
    adduser --disabled-password --no-create-home backend && \
    mkdir -p /src/backend/static && \
    mkdir -p /src/backend/media && \
    mkdir -p /src/backend/files && \
    mkdir -p /src/backend/logs && \
    chown -R backend:backend /src && \
    chmod -R 755 /src && \
    chmod -R +x /scripts

ENV PATH="/scripts:/py/bin:$PATH"
ENV LIBRARY_PATH=/lib:/usr/lib

USER backend

#CMD ["run.sh"]