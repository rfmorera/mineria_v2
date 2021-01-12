from django.http import Http404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import filters, decorators
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.settings import api_settings

from mineriaApp.models_v2.report_data import ReportDSentiment
from mineriaApp.models_v2.report_param import ReportPSentiment, ReportPSentimentPlanteamientos
from mineriaApp.serializers.report import ReportFullSentintimentSerializer, \
    ReportPSentimentPlanteamientoSerializer
from mineriaApp.services.SentimentService import SentimentService


class ReportSentimentViewSet(viewsets.ModelViewSet):
    """
        API endpoint that allows reports sentiment to be viewed or edited.
    """
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, ]

    search_fields = ['name', 'description']
    ordering_fields = ['name', 'start_date', 'delta_type', 'created_on']
    ordering = ['created_on']  # Default ordering

    filterset_fields = ['favorite']
    queryset = ReportPSentimentPlanteamientos.objects.none()
    # permission_classes = [permissions.IsAuthenticated,
    #                       Or(GroupsPermission.IsAdminGroup, GroupsPermission.IsReportMakerGroup,
    #                          GroupsPermission.IsManagerGroup,
    #                          And(GroupsPermission.IsSafeRequest, GroupsPermission.IsReportViewerGroup))]
    permission_classes = [AllowAny, ]
    serializer_class = ReportPSentimentPlanteamientoSerializer

    def get_queryset(self):
        """
        This view should return a list of all the report_param
        for the currently authenticated client.
        """
        qset = ReportPSentiment.objects.none()

        user = self.request.user
        if user.id is not None:
            qset = ReportPSentiment.objects.filter(client=user.client.id)

        favorite = self.request.query_params.get('favorite', None)
        if favorite is not None:
            favorite = bool(favorite)
            qset = qset.filter(favorite=favorite)

        return qset

    def create(self, request, *args, **kwargs):
        user = self.request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = ReportPSentimentPlanteamientos(**serializer.validated_data)
        instance.client = user.client.id
        self.perform_create(instance)
        serializer = ReportPSentimentPlanteamientoSerializer(instance)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @decorators.action(detail=False)
    def all(self, request, *args, **kwargs):
        self.pagination_class = None
        result = super(ReportSentimentViewSet, self).list(request, *args, **kwargs)
        self.pagination_class = api_settings.DEFAULT_PAGINATION_CLASS
        return result

    def perform_update(self, serializer):
        instance = self.get_object()
        ReportDSentiment.objects(report_param=instance.id).delete()
        serializer.save()

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
