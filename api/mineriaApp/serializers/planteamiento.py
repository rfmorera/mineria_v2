from rest_framework_mongoengine.serializers import DocumentSerializer

from mineriaApp.models_v2.opinion import Planteamiento


class PlanteamientoSerializer(DocumentSerializer):
    class Meta:
        model = Planteamiento
        depth = 2
        fields = ('id', 'content', 'entidades', 'fecha')
