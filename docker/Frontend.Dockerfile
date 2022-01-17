FROM node:14-alpine as build
WORKDIR /frontend

COPY ../app/frontend/package.json .
RUN npm install
COPY ../app/frontend .
RUN npm run build

FROM nginx:latest
COPY ../nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /frontend/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]