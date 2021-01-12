from rest_framework_mongoengine.serializers import DocumentSerializer

from mineriaApp.models_v2.super_region import SuperRegion


class SuperRegionSerializer(DocumentSerializer):
    class Meta:
        model = SuperRegion
        fields = ('id', 'name', 'description')
