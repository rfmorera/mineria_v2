from rest_framework_mongoengine.serializers import DocumentSerializer

from mineriaApp.models_v2.entity import Entidad


class EntidadSerializer(DocumentSerializer):
    class Meta:
        model = Entidad
        fields = ('id', 'nombre', 'descripcion')
