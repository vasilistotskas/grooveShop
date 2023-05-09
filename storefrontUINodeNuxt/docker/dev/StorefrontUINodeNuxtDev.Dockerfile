FROM node:18.16.0-alpine as construction

COPY ./docker/dev/docker_entrypoint.sh /app/docker_entrypoint.sh

RUN mkdir -p /mnt/app && \
    chmod 777 -R /mnt/app && \
    chown -R node:node /mnt/app

VOLUME /mnt/app

WORKDIR /mnt/app

USER node

ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000
ENV NODE_ENV development

ENTRYPOINT ["/app/docker_entrypoint.sh"]
