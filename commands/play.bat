REM start cmd.exe /k "cd app/ && env\scripts\activate && python manage.py runserver"
start cmd.exe /k "docker-compose up --build"
start cmd.exe /k "cd frontend/ && npm i && npm run serve"
