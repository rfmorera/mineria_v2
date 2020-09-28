from django_mongoengine import Document
from mongoengine import StringField, ReferenceField


class Municipio(Document):
    nombre = StringField()
    provincia = ReferenceField('Provincia')
