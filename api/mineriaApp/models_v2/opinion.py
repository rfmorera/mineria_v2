import datetime

from django_mongoengine import Document
from mongoengine import ReferenceField, ListField, IntField
from mongoengine import StringField, DateTimeField

from mineriaApp.models_v2.entry import Entry
from mineriaApp.models_v2.sentiment import Sentiment


class Opinion(Document):
    content = StringField()
    processed_content = StringField()
    summary = StringField(default="No procesado.")
    keywords = ListField(StringField(default="No procesado."))
    meta = {'allow_inheritance': True}
    sentiment = ReferenceField(Sentiment)
    entry = ReferenceField(Entry)
    date = DateTimeField(default=datetime.datetime.now())
    entities = ListField(ReferenceField('Entity'))


class Tweet(Opinion):
    tweet_id = IntField()
    tweet_text = StringField()  # TODO: check if this property can be removed using raw_content above
