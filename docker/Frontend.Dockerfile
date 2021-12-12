FROM node:14.18.1 as build
WORKDIR /vueapp

COPY ../grooveVueTS/vue-ts/package.json .
RUN npm install
COPY ../grooveVueTS/vue-ts .
RUN npm run build

FROM nginx:1.19
COPY ../nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /vueapp/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]