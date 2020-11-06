from django_mongoengine import Document
from mongoengine import StringField, IntField


class Entidad(Document):
    codigo = IntField(required=True, unique=True)
    nombre = StringField(required=True)
    descripcion = StringField()
    organismo_id = IntField()
