import mongoengine
from django_mongoengine import Document
from mongoengine import IntField, DateTimeField, ReferenceField, FloatField

from mineriaApp.models_v2.report_param import ReportParam


class ReportData(Document):
    report_param = ReferenceField(ReportParam, required=True, reverse_delete_rule=mongoengine.CASCADE)
    start_date = DateTimeField(required=True)
    end_date = DateTimeField(required=True)

    meta = {'allow_inheritance': True}


class ReportDSentiment(ReportData):
    total_opinion = IntField(required=True)
    total_positive = IntField(required=True)
    total_negative = IntField(required=True)
    total_neutral = IntField(required=True)
    ratio = FloatField(required=True)
