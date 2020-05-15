from mineriaApp.Models.MongoModels import Sentiment, Opinion
from rest_framework_mongoengine.serializers import DocumentSerializer, EmbeddedDocumentSerializer


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