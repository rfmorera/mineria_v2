from mineriaApp.Models.MongoModels import Sentiment, Opinion, Entrada, Fuente, Entidad, ReportePolaridad, ReportParam
from rest_framework_mongoengine.serializers import DocumentSerializer


class SentimentSerializer(DocumentSerializer):
    class Meta:
        model = Sentiment
        fields = ('sentiment', 'sentiment_scores')


class OpinionSerializer(DocumentSerializer):
    class Meta:
        model = Opinion
        fields = ('id', 'content')


class OpinionSummarySerializer(DocumentSerializer):
    class Meta:
        model = Opinion
        fields = ('id', 'resumen', 'keywords')


class OpinionSentimentSerializer(DocumentSerializer):
    class Meta:
        model = Opinion
        depth = 2
        fields = ('id', 'sentiment')


class EntradaSerializer(DocumentSerializer):
    class Meta:
        model = Entrada
        depth = 2
        fields = ('id', 'content', 'fecha', 'fuente', 'entidades')


class FuenteSerializer(DocumentSerializer):
    class Meta:
        model = Fuente
        fields = ('id', 'nombre')


class EntidadSerializer(DocumentSerializer):
    class Meta:
        model = Entidad
        fields = ('id', 'nombre', 'descripcion')


class ReportePolaridadSerializer(DocumentSerializer):
    class Meta:
        model = ReportePolaridad
        fields = ('total_opinion', 'total_positive', 'total_negative', 'total_neutral', 'ratio')


class ReportParamSerializer(DocumentSerializer):
    class Meta:
        model = ReportParam
        fields = ('id', 'name', 'description', 'inicio', 'fin', 'delta_type', 'delta_value', 'type', 'entradas_id', 'client')
