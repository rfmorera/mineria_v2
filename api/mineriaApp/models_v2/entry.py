from django_mongoengine import Document
from mongoengine import StringField, DateTimeField, ReferenceField, ListField

from mineriaApp.models_v2.source import Source


class Entry(Document):
    meta = {'allow_inheritance': True}
    name = StringField()  # TODO Add title support to Endpoint
    content = StringField()
    processed_content = StringField()
    date = DateTimeField()
    source = ReferenceField(Source)
    summary = StringField(default="No procesado.")
    keywords = ListField(StringField(default="No procesado."))
    entities = ListField(ReferenceField('Entity'))


class PortalEntry(Entry):
    labels = ListField(StringField())


class PlanteamientoEntry(Entry):
    super_region = ReferenceField('Provincia')
    region = ReferenceField('Municipio')
