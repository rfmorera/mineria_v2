from django_mongoengine import Document
from mongoengine import StringField, IntField


class Entity(Document):
    code = IntField(required=True, unique=True)
    name = StringField(required=True)
    description = StringField()
    organismo_id = IntField()
