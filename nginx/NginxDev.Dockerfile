FROM nginx:latest
COPY ssl/cert.pem /etc/nginx/cert.pem
COPY ssl/key.pem /etc/nginx/key.pem
COPY ./dev-nginx.conf /etc/nginx/nginx.conf
