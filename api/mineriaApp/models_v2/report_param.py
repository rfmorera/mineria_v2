from django_mongoengine import Document
from mongoengine import StringField, IntField, DateTimeField, ReferenceField, ListField

from mineriaApp.models_v2.entidad import Entidad
from mineriaApp.models_v2.entrada import Entrada
from mineriaApp.models_v2.municipio import Municipio
from mineriaApp.models_v2.provincia import Provincia


class ReportParam(Document):
    client = IntField(required=True)
    name = StringField(required=True)
    description = StringField(default="")
    inicio = DateTimeField(required=True)
    fin = DateTimeField()
    delta_type = StringField(required=True)
    delta_value = IntField(required=True)
    entradas_id = ListField(ReferenceField(Entrada), max_length=5)

    meta = {'allow_inheritance': True}


class ReportPSentiment(ReportParam):
    pass


class ReportPSentimentPlanteamientos(ReportPSentiment):
    # Planteamientos
    provincias = ListField(ReferenceField(Provincia))
    municipios = ListField(ReferenceField(Municipio))
    entidades = ListField(ReferenceField(Entidad))