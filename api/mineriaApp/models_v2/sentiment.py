import datetime

from django_mongoengine import Document
from mongoengine import StringField, DateTimeField, DictField, DecimalField


class Sentiment(Document):
    sentiment = StringField(required=True)
    sentiment_scores = DictField(DecimalField(precision=4))
    date_created = DateTimeField(default=datetime.datetime.utcnow())
