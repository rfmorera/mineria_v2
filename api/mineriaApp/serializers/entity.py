from rest_framework_mongoengine.serializers import DocumentSerializer

from mineriaApp.models_v2.entity import Entity


class EntitySerializer(DocumentSerializer):
    class Meta:
        model = Entity
        fields = ('id', 'name', 'description')
