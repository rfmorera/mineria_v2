from rest_framework_mongoengine.serializers import DocumentSerializer

from mineriaApp.models_v2.region import Region


class RegionSerializer(DocumentSerializer):
    class Meta:
        model = Region
        fields = ('id', 'name', 'description', 'super_region')
