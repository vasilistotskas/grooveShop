FROM node:19.0-alpine as build
WORKDIR /frontend

COPY ../src/frontend ./
RUN rm -rf ./node_modules
RUN rm -rf ./build
RUN rm -rf ./dist

RUN npm install && \
    npm ci && \
    npm run build:vite

ENTRYPOINT npm run dev
