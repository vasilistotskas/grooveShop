REM createsuperuser.bat
REM createusersfaker.bat
REM createproductfaker.bat
REM createordersfaker.bat
REM createblogfaker.bat

docker-compose run backend sh -c "python manage.py makemigrations --noinput"
docker-compose run backend sh -c "python manage.py populate_users"
docker-compose run backend sh -c "python manage.py populate_products"
docker-compose run backend sh -c "python manage.py populate_orders"
docker-compose run backend sh -c "python manage.py populate_blog"
docker-compose run backend sh -c "python manage.py populate_reviews"
docker-compose run backend sh -c "python manage.py collectstatic --noinput"
docker-compose run backend sh -c "python manage.py createsuperuser"

docker exec -it 4246d52c608c python manage.py populate_reviews
docker exec -it 4246d52c608c python manage.py makemigrations

REM FOR PYTHON ENV ---- run migrations from here
docker exec -it -i 7179b3a503e4 /bin/sh

REM FOR elasticsearch
python manage.py search_index --rebuild

REM FOR OTHER ENVS
docker exec -it a0d879e07554 bash

REM NAMED DOCKER YML FILES RUN
docker-compose -f docker-compose-dev.yml up --build