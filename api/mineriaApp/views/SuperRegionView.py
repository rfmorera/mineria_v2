from rest_condition import Or
from rest_framework import decorators
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.settings import api_settings
from rest_framework_mongoengine import viewsets

from mineriaApp.models_v2.super_region import SuperRegion
from mineriaApp.permissions.GroupsPermission import IsManagerGroup, IsAdminGroup
from mineriaApp.serializers.super_region import SuperRegionSerializer


class SuperRegionView(viewsets.ModelViewSet):
    queryset = SuperRegion.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, Or(IsManagerGroup, IsAdminGroup)]
    serializer_class = SuperRegionSerializer

    @decorators.action(detail=False)
    def all(self, request, *args, **kwargs):
        self.pagination_class = None
        result = super(SuperRegionView, self).list(request, *args, **kwargs)
        self.pagination_class = api_settings.DEFAULT_PAGINATION_CLASS
        return result
