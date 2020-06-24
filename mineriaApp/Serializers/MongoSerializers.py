from rest_framework_mongoengine.serializers import DocumentSerializer

from mineriaApp.Models.MongoModels import Sentiment, Opinion, Entrada, Fuente, Entidad, ReportDSentiment, \
    ReportPSentiment, ReportPSentimentPlanteamientos


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


class ReportPSentimentSerializer(DocumentSerializer):
    class Meta:
        model = ReportPSentiment
        fields = (
            'id', 'name', 'description', 'inicio', 'fin', 'delta_type', 'delta_value', 'entradas_id')


class ReportDSentimentSerializer(DocumentSerializer):
    class Meta:
        model = ReportDSentiment
        fields = (
            'fecha_inicio', 'total_opinion', 'total_positive', 'total_negative', 'total_neutral', 'ratio')


class ReportPSentimentPlanteamientoSerializer(DocumentSerializer):
    class Meta:
        model = ReportPSentimentPlanteamientos
        fields = (
            'id', 'name', 'description', 'inicio', 'fin', 'delta_type', 'delta_value', 'entradas_id',
            'provincias', 'municipios', 'entidades')
