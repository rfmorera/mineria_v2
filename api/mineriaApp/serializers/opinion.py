from rest_framework_mongoengine.serializers import DocumentSerializer

from mineriaApp.models_v2.opinion import Opinion


class OpinionSerializer(DocumentSerializer):
    class Meta:
        model = Opinion
        fields = ('id', 'content', 'entry')


class OpinionSentimentSerializer(DocumentSerializer):
    class Meta:
        model = Opinion
        depth = 2
        fields = ('id', 'sentiment')


class OpinionSummarySerializer(DocumentSerializer):
    class Meta:
        model = Opinion
        fields = ('id', 'summary', 'keywords')
