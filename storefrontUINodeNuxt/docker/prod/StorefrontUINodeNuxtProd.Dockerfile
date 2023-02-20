FROM node:18.12.1-alpine as construction

RUN npm install -g pnpm

WORKDIR /app

RUN chmod -R 777 /app && \
    chown -R node:node /app

COPY ./src ./

RUN rm -rf ./node_modules & \
    rm -rf ./build & \
    rm -rf ./dist

RUN pnpm ci && pnpm run build

FROM node:18.12.1-alpine as deployment

USER node

ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000

WORKDIR /app
USER node

COPY --from=construction /app/.output /app/.output
COPY --from=construction /app/.nuxt /app/.nuxt

ENTRYPOINT ["node", "/app/.output/server/index.mjs"]
