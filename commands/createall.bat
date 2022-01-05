REM createsuperuser.bat
REM createusersfaker.bat
REM createproductfaker.bat
REM createordersfaker.bat
REM createblogfaker.bat

docker exec -it d6cd6f7d1343 python manage.py populate_users
docker exec -it 3165de419fb4 python manage.py populate_products
docker exec -it d6cd6f7d1343 python manage.py populate_orders
docker exec -it d6cd6f7d1343 python manage.py populate_blog
docker exec -it 3e87cecb90f1 python manage.py collectstatic --noinput
docker exec -it d6cd6f7d1343 python manage.py makemigrations --noinput
docker exec -it d6cd6f7d1343 python manage.py createsuperuser

docker-compose -f docker-compose-dev.yml run app sh -c "python manage.py makemigrations --noinput"

REM FOR PYTHON ENV
docker exec -it c0c5 /bin/sh

REM FOR OTHER ENVS
docker exec -it c0c5 bash

REM NAMED DOCKER YML FILES RUN
docker-compose -f docker-compose-dev.yml up --build