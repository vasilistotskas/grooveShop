FROM node:14.18.1 as build
WORKDIR /vueapp

ARG VUE_APP_API_URL
ARG VUE_APP_GRAPHQL_URL
ENV VUE_APP_API_URL=$VUE_APP_API_URL
ENV VUE_APP_GRAPHQL_URL=$VUE_APP_GRAPHQL_URL

COPY ../grooveVueTS/vue-ts/package.json .
RUN npm install
COPY ../grooveVueTS/vue-ts .
RUN npm run build

FROM nginx:1.19
COPY ../nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /vueapp/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]