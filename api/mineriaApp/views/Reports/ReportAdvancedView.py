from rest_condition import Or
from rest_framework import decorators, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework_mongoengine import viewsets

from mineriaApp.models_v2.report_advanced import ReportAdvanced
from mineriaApp.permissions.GroupsPermission import IsManagerGroup, IsAdminGroup
from mineriaApp.serializers.report_advanced import ReportAdvancedSerializer


class ReportAdvancedViewSet(viewsets.ModelViewSet):
    queryset = ReportAdvanced.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, Or(IsManagerGroup, IsAdminGroup)]
    serializer_class = ReportAdvancedSerializer

    def create(self, request, *args, **kwargs):
        user = self.request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = ReportAdvanced(**serializer.validated_data)
        instance.client = user.client.id
        self.perform_create(instance)
        serializer = ReportAdvancedSerializer(instance)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @decorators.action(detail=False)
    def all(self, request, *args, **kwargs):
        self.pagination_class = None
        result = super(ReportAdvancedViewSet, self).list(request, *args, **kwargs)
        self.pagination_class = api_settings.DEFAULT_PAGINATION_CLASS
        return result
