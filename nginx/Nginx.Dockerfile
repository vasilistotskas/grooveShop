FROM nginx:latest
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY uwsgi_params /etc/nginx/uwsgi_params
