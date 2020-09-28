import datetime

from django_mongoengine import Document
from mongoengine import ReferenceField, ListField, IntField
from mongoengine import StringField, DateTimeField

from mineriaApp.models_v2.entrada import Entrada
from mineriaApp.models_v2.sentiment import Sentiment


class Opinion(Document):
    content = StringField()
    processed_content = StringField()
    resumen = StringField(default="No procesado.")
    keywords = ListField(StringField(default="No procesado."))
    meta = {'allow_inheritance': True}
    sentiment = ReferenceField(Sentiment)
    entrada = ReferenceField(Entrada)
    fecha = DateTimeField(default=datetime.datetime.now())


class Planteamiento(Opinion):
    entidades = ListField(ReferenceField('Entidad'))


class Tweet(Opinion):
    tweet_id = IntField()
    tweet_text = StringField()  # TODO: check if this property can be removed using raw_content above

    @staticmethod
    def create(row):
        return Tweet(tweet_id=row["tweet_id"],
                     tweet_date_created=row["tweet_date_created"],
                     tweet_text=row["tweet_text"],
                     external_id=row["external_id"])
