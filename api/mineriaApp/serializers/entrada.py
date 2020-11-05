from rest_framework_mongoengine.serializers import DocumentSerializer

from mineriaApp.models_v2.entrada import Entrada


class EntradaSerializer(DocumentSerializer):
    class Meta:
        model = Entrada
        depth = 1
        fields = ('id', 'name', 'content', 'date', 'source', 'entities')


class CreateEntradaSerializer(DocumentSerializer):
    class Meta:
        model = Entrada
        fields = ('id', 'name', 'content', 'date', 'source', 'entities')
