from django_mongoengine import Document
from mongoengine import StringField, DateTimeField, ReferenceField, ListField

from mineriaApp.models_v2.fuente import Fuente


class Entrada(Document):
    meta = {'allow_inheritance': True}
    name = StringField(required=True)  # TODO Add title support to Endpoint
    content = StringField(required=True)
    processed_content = StringField()
    date = DateTimeField()
    source = ReferenceField('Fuente', required=True)
    resumen = StringField(default="No procesado.")
    keywords = ListField(StringField(default="No procesado."))
    entities = ListField(ReferenceField('Entidad'))


class PortalEntrada(Entrada):
    etiquetas = ListField(StringField())


class PlanteamientoEntrada(Entrada):
    provincia = ReferenceField('Provincia')
    municipio = ReferenceField('Municipio')
