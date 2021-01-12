from rest_condition import Or
from rest_framework import decorators
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.settings import api_settings
from rest_framework_mongoengine import viewsets

from mineriaApp.models_v2.region import Region
from mineriaApp.permissions.GroupsPermission import IsManagerGroup, IsAdminGroup
from mineriaApp.serializers.region import RegionSerializer


class RegionView(viewsets.ModelViewSet):
    queryset = Region.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, Or(IsManagerGroup, IsAdminGroup)]
    serializer_class = RegionSerializer

    @decorators.action(detail=False)
    def all(self, request, *args, **kwargs):
        self.pagination_class = None
        result = super(RegionView, self).list(request, *args, **kwargs)
        self.pagination_class = api_settings.DEFAULT_PAGINATION_CLASS
        return result
