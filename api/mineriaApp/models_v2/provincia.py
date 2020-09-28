from django_mongoengine import Document
from mongoengine import StringField


class Provincia(Document):
    nombre = StringField(required=True, unique=True)
    normalized = StringField(required=True, unique=True)
