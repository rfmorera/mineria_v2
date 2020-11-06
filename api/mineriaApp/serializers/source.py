from rest_framework_mongoengine.serializers import DocumentSerializer

from mineriaApp.models_v2.source import Source


class FuenteSerializer(DocumentSerializer):
    class Meta:
        model = Source
        fields = ('id', 'name', 'description')
