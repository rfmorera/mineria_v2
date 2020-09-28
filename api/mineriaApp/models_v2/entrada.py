from django_mongoengine import Document
from mongoengine import StringField, DateTimeField, ReferenceField, ListField

from mineriaApp.models_v2.fuente import Fuente


class Entrada(Document):
    meta = {'allow_inheritance': True}
    titulo = StringField()  # TODO Add title support to Endpoint
    content = StringField()
    processed_content = StringField()
    fecha = DateTimeField()
    fuente = ReferenceField(Fuente)
    resumen = StringField(default="No procesado.")
    keywords = ListField(StringField(default="No procesado."))
    entidades = ListField(ReferenceField('Entidad'))


class PortalEntrada(Entrada):
    etiquetas = ListField(StringField())


class PlanteamientoEntrada(Entrada):
    provincia = ReferenceField('Provincia')
    municipio = ReferenceField('Municipio')
