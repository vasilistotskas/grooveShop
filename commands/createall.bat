REM createsuperuser.bat
REM createusersfaker.bat
REM createproductfaker.bat
REM createordersfaker.bat
REM createblogfaker.bat

docker exec -it a3ac56249ac3 python manage.py populate_orders
docker exec -it fb3ae7fa4bec python manage.py collectstatic --noinput

REM FOR PYTHON ENV
docker exec -it c0c5 /bin/sh

REM FOR OTHER ENVS
docker exec -it c0c5 bash