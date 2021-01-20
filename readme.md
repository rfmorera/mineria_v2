# Installation

**Important** Frontend isn't ready for deploy, do all the process only for API (backend)

# Deploy & development 
For deploy **master** branch is used for production and **develop** branch for development stage. For local development you can use any branch you want.

> Note: For production and development stages you can use any branch you want, but master and develop are the recommended ones.

## Local Development
In order to setup a local environment for development you need to follow the following steps:

- Install backend requirements (and maybe an **virtual environment**). `cd api && pip install -r requirements.txt`
- Install frontend packages. `cd frontend && npm install`
- Add required key/value env values
  - Add the following values in `frontend/.env` file:
    - REACT_APP_MINERIA_API_URL=http://127.0.0.1:8000/api   # the host:port can change depending on your local configuration.
  - Add the following values in `api/.env` file:
    - DEPLOY_MODE=development
    - DEBUG=True
    - SECRET_KEY=not_too_secret_key
    - ALLOWED_HOSTS=*
    - EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
    - MONGO_NAME=
    - MONGO_HOST=
    - MONGO_USER=
    - MONGO_PWD=
- Start your frontend app at any port. `cd frontend && npm start`
- Create the local sqlite database for development. `cd api && python manage.py migrate`
- Load initial data:
    - ```python manage.py loaddata resources\data\fixtures\group.json```
    - ```python manage.py loaddata resources\data\fixtures\client.json```
    - ```python initial_data_loader\main.py```
- Start your backend django app (if you change the port remember also change the `REACT_APP_MINERIA_API_URL` value in the .env of the frontend, otherwise the request to the API will raise 404 errors). `cd api && python manage.py runserver`
- Happy codding!

## Development stage
This development stage works in **production mode**. In nutshell, it works with the same configuration (except secret values and that stuff) of the production stage with the difference of the databases. Development stage uses mySql database.

In order to setup this environment docker and docker-compose must be installed in the system.

In summary, to set this stage up is needed:
- Add environment files (.env)
- Request SSL certificates
- Build and up the docker container

### Needed .env for development
Unlike local development, these dockerized environments store all the configuration and environment files in the `config` directory in the root of the project.

**Django environments:**

The file will be stored in `config/django/.env.dev` and must be named `.env.dev`:
- DEPLOY_MODE=development
- DEBUG=False
- SECRET_KEY=your_super_secret_key
- ALLOWED_HOSTS=develop.mintext.cloud.desoft.cu
- DB_NAME= **Buscar info** `/srv/www/wayamintegral.com/db/db.sqlite3`
- MONGO_NAME=NLPStore
- MONGO_HOST=mongodb://localhost:27017/
- MONGO_USER=
- MONGO_PWD=

**Frontend environments:**

The file will be stored in `config/frontend/.env.dev` and must be named `.env.dev`. For this case, be sure to write the address with `https` otherwise the browser will detect `http` requests from a secured site and will flag the whole site as insecure.
- REACT_APP_MINERIA_API_URL=https://develop.mintext.cloud.desoft.cu

# Pending to Analyze
This must be added to Dockerfile, initial data load.

Also the inital data transformation for entidades and planteamiento is ready but need to be added to development process in a handy way
```
python manage.py makemigrations
python manage.py migrate
```

**Check init_scripts/fixtures/readme.md**
```bash
python manage.py loaddata init_scripts\fixtures\group.json
python manage.py loaddata init_scripts\fixtures\client.json
```

```bash
# Create default Users
python manage.py createsuperuser
admin
```
