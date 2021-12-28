REM createsuperuser.bat
REM createusersfaker.bat
REM createproductfaker.bat
REM createordersfaker.bat
REM createblogfaker.bat

docker exec -it 285fd21a2e1d python manage.py populate_users
docker exec -it 285fd21a2e1d python manage.py populate_products
docker exec -it 285fd21a2e1d python manage.py populate_orders
docker exec -it 285fd21a2e1d python manage.py populate_blog
docker exec -it 285fd21a2e1d python manage.py collectstatic --noinput

REM FOR PYTHON ENV
docker exec -it c0c5 /bin/sh

REM FOR OTHER ENVS
docker exec -it c0c5 bash

REM NAMED DOCKER YML FILES RUN
docker-compose -f docker-compose-dev.yml up --build