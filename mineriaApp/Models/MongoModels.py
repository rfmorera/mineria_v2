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
    fecha = DateTimeField(default=datetime.datetime.now())


class Tweet(Opinion):
    tweet_id = IntField()
    tweet_text = StringField()  # TODO: check if this property can be removed using raw_content above

    @staticmethod
    def create(row):
        return Tweet(tweet_id=row["tweet_id"],
                     tweet_date_created=row["tweet_date_created"],
                     tweet_text=row["tweet_text"],
                     external_id=row["external_id"])


class Planteamiento(Opinion):
    entidades = ListField(ReferenceField('Entidad'))


class Fuente(Document):
    nombre = StringField(unique=True)


class Provincia(Document):
    nombre = StringField(required=True, unique=True)
    normalized = StringField(required=True, unique=True)


class Municipio(Document):
    nombre = StringField()
    provincia = ReferenceField('Provincia')


class Entrada(Document):
    meta = {'allow_inheritance': True}
    titulo = StringField()  # TODO Add title support to Endpoint
    content = StringField()
    processed_content = StringField()
    fecha = DateTimeField()
    fuente = ReferenceField(Fuente)
    resumen = StringField(default="No procesado.")
    keywords = ListField(StringField(default="No procesado."))
    entidades = ListField(ReferenceField('Entidad'))


class PortalEntrada(Entrada):
    etiquetas = ListField(StringField())


class PlanteamientoEntrada(Entrada):
    provincia = ReferenceField('Provincia')
    municipio = ReferenceField('Municipio')


class Entidad(Document):
    codigo = IntField(required=True, unique=True)
    nombre = StringField(required=True)
    descripcion = StringField()
    organismo_id = IntField()


class ReportParam(Document):
    client = IntField(required=True)
    name = StringField(required=True)
    description = StringField(default="")
    inicio = DateTimeField(required=True)
    fin = DateTimeField()
    delta_type = StringField(required=True)
    delta_value = IntField(required=True)
    entradas_id = ListField(ReferenceField(Entrada), required=True, max_length=5)
    type = StringField(required=True, default=None)

    meta = {'allow_inheritance': True}


class ReportParamPlanteamientos(ReportParam):
    provincias = ListField(ReferenceField(Provincia))
    municipios = ListField(ReferenceField(Municipio))
    entidades = ListField(ReferenceField(Entidad))


class ReportData(Document):
    report_param = ReferenceField(ReportParam, required=True)
    fecha_inicio = DateTimeField(required=True)

    meta = {'allow_inheritance': True}


class ReportePolaridad(ReportData):
    total_opinion = IntField(required=True)
    total_positive = IntField(required=True)
    total_negative = IntField(required=True)
    total_neutral = IntField(required=True)
    ratio = DecimalField(required=True)
