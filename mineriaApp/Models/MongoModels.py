from django_mongoengine import Document
import datetime
from mongoengine import StringField, IntField, DateTimeField, ReferenceField, DictField, DecimalField, ListField


class Sentiment(Document):
    sentiment = StringField(required=True)
    sentiment_scores = DictField(DecimalField(precision=4))
    date_created = DateTimeField(default=datetime.datetime.utcnow())


    @staticmethod
    def create(external_id, row):
        return Sentiment(
                         sentiment=row['Sentiment'],
                         sentiment_scores=str(row['SentimentScore']))


class Opinion(Document):
    content = StringField()
    processed_content = StringField()
    resumen = StringField(default="No procesado.")
    keywords = ListField(StringField(default="No procesado."))
    meta = {'allow_inheritance': True}
    sentiment = ReferenceField('Sentiment')
    entrada = ReferenceField('Entrada')
    fecha = DateTimeField()


class Tweet(Opinion):
    tweet_id = IntField()
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
    meta = {'allow_inheritance': True}
    content = StringField()
    processed_content = StringField()
    fecha = DateTimeField(default=datetime.datetime.utcnow)
    fuente = ReferenceField(Fuente)
    resumen = StringField(default="No procesado.")
    keywords = ListField(StringField(default="No procesado."))
    entidades = ListField(ReferenceField('Entidad'))


class PortalEntrada(Entrada):
    etiquetas = ListField(StringField())


class Entidad(Document):
    nombre = StringField()
    descripcion = StringField()


class Reporte(Document):
    total_opinion = IntField()
    total_positive = IntField()
    total_negative = IntField()
    total_neutral = IntField()
    ratio = DecimalField()
    fecha = DateTimeField()
    timedelta = IntField()
