from django_mongoengine import Document
from mongoengine import StringField


class Source(Document):
    name = StringField(unique=True)
    description = StringField(required=True)
