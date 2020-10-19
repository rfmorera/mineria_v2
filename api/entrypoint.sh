#!/bin/sh

#python -m pip install psycopg2
#apt-get install 

echo "Waiting for mysql"
while ! nc -z mysql 3306; do echo '.'; sleep 0.1; done
echo "mysql is UP ..."
echo "Waiting for mongodb"
while ! nc -z mongodb 27017; do echo '.'; sleep 0.1; done
echo "mongodb is UP ..."

python manage.py makemigrations
python manage.py migrate

python manage.py loaddata resources/data/fixtures/client.json
python manage.py loaddata resources/data/fixtures/group.json

#python initial_data_loader/main.py
#python manage.py createsuperuser

python manage.py runserver 0.0.0.0:8000
