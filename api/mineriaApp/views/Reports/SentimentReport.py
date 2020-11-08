from django.http import Http404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import filters
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from mineriaApp.models_v2.report_param import ReportPSentiment, ReportPSentimentPlanteamientos
from mineriaApp.serializers.report import ReportPSentimentSerializer, ReportFullSentintimentSerializer, \
    ReportPSentimentPlanteamientoSerializer
from mineriaApp.services.SentimentService import SentimentService


class ReportSentimentViewSet(viewsets.ModelViewSet):
    """
        API endpoint that allows reports sentiment to be viewed or edited.
    """
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]

    search_fields = ['name', 'description']
    ordering_fields = ['name', 'start_date', 'delta_type']
    ordering = ['name']  # Default ordering

    queryset = ReportPSentiment.objects.none()
    # permission_classes = [permissions.IsAuthenticated,
    #                       Or(GroupsPermission.IsAdminGroup, GroupsPermission.IsReportMakerGroup,
    #                          GroupsPermission.IsManagerGroup,
    #                          And(GroupsPermission.IsSafeRequest, GroupsPermission.IsReportViewerGroup))]
    permission_classes = [AllowAny, ]
    serializer_class = ReportPSentimentSerializer
    http_method_names = ['get', 'post', 'head', 'delete']

    def get_queryset(self):
        """
        This view should return a list of all the report_param
        for the currently authenticated client.
        """
        user = self.request.user
        if user.id is None:
            return ReportPSentiment.objects.none()
        return ReportPSentiment.objects.filter(client=user.client.id)

    def create(self, request, *args, **kwargs):
        user = self.request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = ReportPSentiment(**serializer.validated_data)
        instance.client = user.client.id
        self.perform_create(instance)
        serializer = ReportPSentimentSerializer(instance)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=True, methods=['get'], url_path="report")
    @swagger_auto_schema(
        responses={200: ReportFullSentintimentSerializer(), 400: "Reporte Id Invalido"})
    def report(self, request, pk):
        """
        Devuelve los resultados del reporte
        """
        try:
            param = ReportPSentiment.objects.get(pk=pk)
        except ReportPSentiment.DoesNotExist:
            raise Http404("No MongoModels.ReportPSentiment matches the given query.")
        reports = SentimentService.build_report(param.id, param.entries_id, param.start_date, param.end_date,
                                                param.delta_value,
                                                param.delta_type)

        param.result = reports
        serializer = ReportFullSentintimentSerializer(param)
        return Response(serializer.data)


class ReportSentimentPlanteamientoViewSet(viewsets.ModelViewSet):
    """
        API endpoint that allows reports sentiment planteamiento to be viewed or edited.
    """
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]

    search_fields = ['name', 'description', 'super_region', 'region']
    ordering_fields = ['name', 'start_date', 'delta_type']
    ordering = ['name']  # Default ordering

    queryset = ReportPSentimentPlanteamientos.objects.none()
    # permission_classes = [permissions.IsAuthenticated,
    #                       Or(GroupsPermission.IsAdminGroup, GroupsPermission.IsReportMakerGroup,
    #                          GroupsPermission.IsManagerGroup,
    #                          And(GroupsPermission.IsSafeRequest, GroupsPermission.IsReportViewerGroup))]
    permission_classes = [AllowAny, ]
    serializer_class = ReportPSentimentPlanteamientoSerializer
    http_method_names = ['get', 'post', 'head', 'delete']

    def get_queryset(self):
        """
        This view should return a list of all the report_param
        for the currently authenticated client.
        """
        user = self.request.user
        return ReportPSentimentPlanteamientos.objects.filter(client=user.client.id)

    def create(self, request, *args, **kwargs):
        user = self.request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = ReportPSentimentPlanteamientos(**serializer.validated_data)
        instance.client = user.cliente.id
        self.perform_create(instance)
        serializer = ReportPSentimentPlanteamientoSerializer(instance)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=True, methods=['get'], url_path="report")
    @swagger_auto_schema(
        responses={200: ReportFullSentintimentSerializer(), 400: "Reporte Id Invalido"})
    def report(self, request, pk):
        """
        Devuelve los resultados del reporte
        """
        try:
            param = ReportPSentimentPlanteamientos.objects.get(pk=pk)
        except ReportPSentimentPlanteamientos.DoesNotExist:
            raise Http404("No MongoModels.ReportPSentiment matches the given query.")

        reports = SentimentService.build_planteamientos_report(param.id, param.start_date, param.end_date,
                                                               param.delta_value,
                                                               param.delta_type, param.super_regions, param.regions,
                                                               param.entities)

        param.result = reports
        serializer = ReportFullSentintimentSerializer(param)
        return Response(serializer.data)
