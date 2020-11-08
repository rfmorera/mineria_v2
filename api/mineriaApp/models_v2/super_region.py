from django_mongoengine import Document
from mongoengine import StringField


class SuperRegion(Document):
    name = StringField(required=True, unique=True)
    description = StringField()
    normalized = StringField(required=True, unique=True)
