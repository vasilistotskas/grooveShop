REM createsuperuser.bat
REM createusersfaker.bat
REM createproductfaker.bat
REM createordersfaker.bat
REM createblogfaker.bat

docker exec -it e53fc607aa48 python manage.py populate_users
docker exec -it e53fc607aa48 python manage.py populate_products
docker exec -it e53fc607aa48 python manage.py populate_orders
docker exec -it e53fc607aa48 python manage.py populate_blog
docker exec -it e53fc607aa48 python manage.py collectstatic --noinput
docker exec -it e53fc607aa48 python manage.py makemigrations --noinput
docker exec -it e53fc607aa48 python manage.py createsuperuser
docker exec -it e53fc607aa48 pytest -m "not selenium" -rP

docker exec -it 70f7ec9716aa find . -name \*.pyc -delete

docker-compose -f docker-compose-dev.yml run app sh -c "python manage.py makemigrations --noinput"

REM FOR PYTHON ENV ---- run migrations from here
docker exec -it -i e53fc607aa48 /bin/sh

REM FOR elasticsearch
python manage.py search_index --rebuild

REM FOR OTHER ENVS
docker exec -it e53fc607aa48 bash

REM NAMED DOCKER YML FILES RUN
docker-compose -f docker-compose-dev.yml up --build