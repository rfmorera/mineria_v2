from datetime import datetime

from django_mongoengine import Document
from mongoengine import StringField, IntField, DateTimeField, ReferenceField, ListField

from mineriaApp.models_v2.report_param import ReportParam


class ReportAdvanced(Document):
    client = IntField(required=True)
    name = StringField(required=True)
    description = StringField(default="")
    basic_reports = ListField(ReferenceField(ReportParam), required=True)
    created_on = DateTimeField(default=datetime.now())
    meta = {'allow_inheritance': True}

    @classmethod
    def pre_save(cls, sender, document, **kwargs):
        document.updated_on = datetime.now()
