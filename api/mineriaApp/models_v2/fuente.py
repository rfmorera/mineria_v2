from django_mongoengine import Document
from mongoengine import StringField


class Fuente(Document):
    nombre = StringField(unique=True)
