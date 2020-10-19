from rest_framework_mongoengine.serializers import DocumentSerializer

from mineriaApp.models_v2.entrada import Entrada


class EntradaSerializer(DocumentSerializer):
    class Meta:
        model = Entrada
        depth = 2
        fields = ('id', 'content', 'fecha', 'fuente', 'entidades')
