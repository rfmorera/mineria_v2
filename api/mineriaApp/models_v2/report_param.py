from datetime import datetime

from django_mongoengine import Document
from mongoengine import StringField, IntField, DateTimeField, ReferenceField, ListField, BooleanField

from mineriaApp.models_v2.entity import Entity
from mineriaApp.models_v2.entry import Entry
from mineriaApp.models_v2.region import Region
from mineriaApp.models_v2.super_region import SuperRegion


class ReportParam(Document):
    client = IntField(required=True)
    name = StringField(required=True)
    description = StringField(default="")
    start_date = DateTimeField(required=True)
    end_date = DateTimeField(null=True)
    delta_type = StringField(required=True)
    delta_value = IntField(required=True)
    entities = ListField(ReferenceField(Entity), max_length=5)
    created_on = DateTimeField(default=datetime.now())
    meta = {'allow_inheritance': True}
    favorite = BooleanField(default=False, null=False)

    @classmethod
    def pre_save(cls, sender, document, **kwargs):
        document.updated_on = datetime.now()


class ReportPSentiment(ReportParam):
    pass


class ReportPSentimentPlanteamientos(ReportPSentiment):
    # Planteamientos
    super_regions = ListField(ReferenceField(SuperRegion))
    regions = ListField(ReferenceField(Region))
