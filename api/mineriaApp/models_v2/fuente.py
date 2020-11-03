from django_mongoengine import Document
from mongoengine import StringField


class Fuente(Document):
    name = StringField(unique=True)
    description = StringField(required=True)
