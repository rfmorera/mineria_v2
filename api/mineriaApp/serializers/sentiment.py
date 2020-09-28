from rest_framework_mongoengine.serializers import DocumentSerializer

from mineriaApp.models_v2.sentiment import Sentiment


class SentimentSerializer(DocumentSerializer):
    class Meta:
        model = Sentiment
        fields = ('sentiment', 'sentiment_scores')
