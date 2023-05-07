FROM node:18.16.0-alpine as builder

WORKDIR /usr/src/app

COPY .env ./
COPY nest-cli.json ./
COPY tsconfig*.json ./
COPY package*.json ./
COPY src/ ./src/

RUN npm install && \
    npm ci && \
    npm run build

# debug: ENTRYPOINT ["tail", "-f", "/dev/null"]

FROM node:18.16.0-alpine as production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/.env ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/nest-cli.json ./

VOLUME ["/usr/src/app/storage"]

CMD ["node", "dist/main"]
