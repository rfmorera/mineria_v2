from django_mongoengine import Document
import datetime
from mongoengine import StringField, IntField, DateTimeField, ReferenceField, DictField, DecimalField, ListField


class Sentiment(Document):
    # external_id = StringField(required=True)
    sentiment = StringField(required=True)
    sentiment_scores = DictField(DecimalField(precision=4))
    # date_created = DateTimeField(default=datetime.utcnow())


    @staticmethod
    def create(external_id, row):
        return Sentiment(
                         sentiment=row['Sentiment'],
                         sentiment_scores=str(row['SentimentScore']))


class Opinion(Document):
    content = StringField()
    processed_content = StringField()
    resumen = StringField(default="No procesado.")
    keywords = StringField(default="No procesado.")
    meta = {'allow_inheritance': True}
    sentiment = ReferenceField('Sentiment')


class Tweet(Opinion):
    tweet_id = IntField()
    tweet_date_created = DateTimeField()
    tweet_text = StringField()  # TODO: check if this property can be removed using raw_content above

    @staticmethod
    def create(row):
        return Tweet(tweet_id=row["tweet_id"],
                     tweet_date_created=row["tweet_date_created"],
                     tweet_text=row["tweet_text"],
                     external_id=row["external_id"])


class Fuente(Document):
    nombre = StringField()


class Entrada(Document):
    content = StringField()
    processed_content = StringField()
    fecha = DateTimeField(default=datetime.datetime.utcnow)
    fuente = ReferenceField(Fuente)
    opinion_list = ListField(ReferenceField(Opinion))
