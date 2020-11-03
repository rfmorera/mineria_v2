from rest_framework_mongoengine.serializers import DocumentSerializer

from mineriaApp.models_v2.fuente import Fuente


class FuenteSerializer(DocumentSerializer):
    class Meta:
        model = Fuente
        fields = ('id', 'name', 'description')
