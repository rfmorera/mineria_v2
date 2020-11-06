from django_mongoengine import Document
from mongoengine import StringField, IntField, DateTimeField, ReferenceField, ListField

from mineriaApp.models_v2.entity import Entity
from mineriaApp.models_v2.entry import Entry
from mineriaApp.models_v2.region import Region
from mineriaApp.models_v2.super_region import SuperRegion


class ReportParam(Document):
    client = IntField(required=True)
    name = StringField(required=True)
    description = StringField(default="")
    inicio = DateTimeField(required=True)
    fin = DateTimeField()
    delta_type = StringField(required=True)
    delta_value = IntField(required=True)
    entradas_id = ListField(ReferenceField(Entry), max_length=5)

    meta = {'allow_inheritance': True}


class ReportPSentiment(ReportParam):
    pass


class ReportPSentimentPlanteamientos(ReportPSentiment):
    # Planteamientos
    provincias = ListField(ReferenceField(SuperRegion))
    municipios = ListField(ReferenceField(Region))
    entidades = ListField(ReferenceField(Entity))
