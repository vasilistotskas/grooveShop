# [GrooveShop](https://github.com/vasilistotskas/grooveShop)
####   -    [Backend](https://github.com/vasilistotskas/grooveShop/tree/master/src/backend)
####   -    [Frontend](https://github.com/vasilistotskas/grooveShop/tree/master/src/frontend)
####   -    [MediaStream](https://github.com/vasilistotskas/grooveShop/tree/master/mediaStream)

## DOCKER :
   ### DJANGO :
   #### Run django db migrations through docker-compose :
   -     docker-compose run backend sh -c "python manage.py makemigrations --noinput"

   #### Run django db migrate through docker-compose :
   -     docker-compose run backend sh -c "python manage.py migrate"

   #### Create superuser through docker-compose :
   -     docker-compose run backend sh -c "python manage.py createsuperuser"

   #### Run django collectstatic through docker-compose :
   -     docker-compose run backend sh -c "python manage.py collectstatic --noinput"

   #### Run django tests through docker-compose :
   -     docker-compose run backend sh -c "python manage.py test backend/tests/"

   #### Run django tests with coverage and html through docker-compose :
   -     docker-compose run backend sh -c "coverage run --omit=*/migrations/*,*/management/*,*/manage.py,*/setup.py,*/asgi.py,*/wsgi.py --source='.' manage.py test backend/tests/ && coverage report && coverage html"

   #### Run django coverage html through docker-compose :
   -     docker-compose run backend sh -c "coverage html"

   #### Seed database with fake data through docker-compose :
   -     docker-compose run backend sh -c "python manage.py populate_all"
   -   #### Seperate seed commands :
   -     docker-compose run backend sh -c "python manage.py populate_users"
         docker-compose run backend sh -c "python manage.py populate_products"
         docker-compose run backend sh -c "python manage.py populate_orders"
         docker-compose run backend sh -c "python manage.py populate_blog"
         docker-compose run backend sh -c "python manage.py populate_reviews"
         docker-compose run backend sh -c "python manage.py populate_countries"
         docker-compose run backend sh -c "python manage.py populate_sliders"
         docker-compose run backend sh -c "python manage.py populate_tips"

   #### Run django test through docker-compose :
   -     docker-compose run backend sh -c "python manage.py test"

   #### Run docker compose for specific yml file :
   -     docker-compose -f <docker-compose-file.yml> up -d --build

   #### Run docker commands through docker exec :
   -     docker exec -it <container_id> <command>

   ### Run specific shell command through docker exec :
   -     docker exec -it <container_id> sh -c "<command>"


## PYTHON
  ### --- VERSION 3.10.7 ---
  ### Virtual Environment :
   -     Install virtualenv : pip install virtualenv
         Create virtual environment : virtualenv <env_name>
         (Case 1)Activate virtual environment : source <env_name>/bin/activate
         (Case 2)Activate virtual environment : <env_name>/scripts/activate
         Deactivate virtual environment : deactivate
         Install requirements : pip install -r requirements.txt
         Install requirements for specific environment : pip install -r requirements/<env_name>.txt

  ### Django :
  -     Install django : pip install djang
        Create django project : django-admin startproject <project_name>
        Create django app : python manage.py startapp <app_name>
        Run django db migrations : python manage.py makemigrations
        Run django db migrate : python manage.py migrate
        Create superuser : python manage.py createsuperuser
        Run django collectstatic : python manage.py collectstatic
        Run django test : python manage.py test
        Run django shell : python manage.py shell
        Run django shell_plus : python manage.py shell_plus
        Run django dbshell : python manage.py dbshell
        Run django runserver : python manage.py runserver

  ### Lint :
  -     Step 1: cd src
  -     AVAILABLE COMMANDS :
        pre-commit run --all-files
        black backend

  ### PyLint :
  -     pylint --load-plugins pylint_django --rcfile=C:\Dev\grooveShop\src\backend\app\settings.py C:\Dev\grooveShop\src\backend\app

  ### Poetry :
  -     Install poetry : curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python
        Create poetry project : poetry new <project_name>
        Install dependencies : poetry install
        Update poetry lock file : poetry lock
        Add dependency : poetry add <dependency_name>
        Remove dependency : poetry remove <dependency_name>
        Update dependency : poetry update <dependency_name>
        Run shell : poetry shell
        Run script : poetry run <script_name>

  ### Strawberry :
  -     Install strawberry : pip install strawberry-graphql
        Create strawberry project : strawberry server
        Run strawberry server : strawberry server
        Run strawberry server for project schema : (src path) : strawberry server backend.core.graphql.schema:schema

  ### pre-commit :
  -     pre-commit install
        git config --unset core.hooksPath

  ### Anaconda :
  -     Install anaconda : https://docs.anaconda.com/anaconda/install/
        Create conda environment : conda create --name <env_name> python=3.10.7
        Activate conda environment : conda activate <env_name>
        Deactivate conda environment : conda deactivate
        Create conda environment from yml file : conda env create -f environment.yml

## SCSS:
  ### Lint :
  -     Step 1: cd src/frontend
  -     (EXPERIMENTAL): scss-lint -c .scss-lint.yml
  -     (NPM):
        npm run lint:scss
        npm run lint:scss:fix

## FRONTEND:
  ### NPM :
   ### --- VERSION 17.5.0 ---
   -     Step 1: cd src/frontend
   -     Run npm Install : npm install

  ### Package.json :
  -  ### SCRIPTS
  -  #### VUE :
        -     npm run serve:vue
              npm run build:vue
              npm run watch:vue
        - #### Lint :
              npm run lint:vue
  -  #### VITE :
        -     npm run build:vite
              npm run watch:vite
              npm run dts:vite
              npm run dev
  -  #### LINT :
        -  ### SCSS
        -     npm run lint:scss
              npm run lint:scss:fix

  -  ### FORMAT:
        -     npm run lint:prettier
              npm run lint:prettier:fix

  -  ### Packages Update
        -     npm install -g npm-check-updates
              (check for updates): ncu
              (update all packages): ncu -u

## MEDIA STREAM:
  ### NPM :
   ### --- VERSION 16.13.1 ---
   -     Step 1: cd mediaStream
   -     Run npm Install : npm install


## GIT
  ### --- VERSION 2.36.0.windows.1 ---
   #### Delete origin tags :
   -     git tag -l | xargs -n 1 git push --delete origin
   #### Delete local tags :
   -     git tag -l | xargs git tag -d
