import datetime

from django.http import Http404
from drf_yasg.utils import swagger_auto_schema
from rest_condition import Or, And
from rest_framework import filters
from rest_framework import status
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from mineriaApp.Models import MongoModels
from mineriaApp.Security import GroupsPermission
from mineriaApp.Serializers import MongoSerializers
from mineriaApp.Services.SentimentService import SentimentService


class ReportSentimentViewSet(viewsets.ModelViewSet):
    """
        API endpoint that allows reports sentiment to be viewed or edited.
    """
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]

    search_fields = ['name', 'description']
    ordering_fields = ['name', 'inicio', 'delta_type']
    ordering = ['name']  # Default ordering

    queryset = MongoModels.ReportPSentiment.objects.none()
    permission_classes = [permissions.IsAuthenticated,
                          Or(GroupsPermission.IsAdminGroup, GroupsPermission.IsReportMakerGroup,
                             GroupsPermission.IsManagerGroup,
                             And(GroupsPermission.IsSafeRequest, GroupsPermission.IsReportViewerGroup))]
    serializer_class = MongoSerializers.ReportPSentimentSerializer

    def get_queryset(self):
        """
        This view should return a list of all the report_param
        for the currently authenticated client.
        """
        user = self.request.user
        return MongoModels.ReportPSentiment.objects.filter(client=user.cliente.id)

    def create(self, request, *args, **kwargs):
        user = self.request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = MongoModels.ReportPSentiment(**serializer.validated_data)
        instance.client = user.cliente.id
        self.perform_create(instance)
        serializer = MongoSerializers.ReportPSentimentSerializer(instance)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=True, methods=['get'], url_path="report")
    @swagger_auto_schema(
        responses={200: MongoSerializers.ReportDSentimentSerializer(many=True), 400: "Reporte Id Invalido"})
    def report(self, request, pk):
        """
        Devuelve los resultados del reporte
        """
        try:
            param = MongoModels.ReportPSentiment.objects.get(pk=pk)
        except MongoModels.ReportPSentiment.DoesNotExist:
            raise Http404("No MongoModels.ReportPSentiment matches the given query.")
        reports = SentimentService.build_report(param.id, param.entradas_id, param.inicio, param.fin, param.delta_value,
                                                param.delta_type)

        serializer = MongoSerializers.ReportDSentimentSerializer(reports, many=True)
        return Response(serializer.data)


class ReportSentimentPlanteamientoViewSet(viewsets.ModelViewSet):
    """
        API endpoint that allows reports sentiment planteamiento to be viewed or edited.
    """
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]

    search_fields = ['name', 'description', 'provincia', 'municipio']
    ordering_fields = ['name', 'inicio', 'delta_type']
    ordering = ['name']  # Default ordering

    queryset = MongoModels.ReportPSentimentPlanteamientos.objects.none()
    permission_classes = [permissions.IsAuthenticated,
                          Or(GroupsPermission.IsAdminGroup, GroupsPermission.IsReportMakerGroup,
                             GroupsPermission.IsManagerGroup,
                             And(GroupsPermission.IsSafeRequest, GroupsPermission.IsReportViewerGroup))]
    serializer_class = MongoSerializers.ReportPSentimentPlanteamientoSerializer

    def get_queryset(self):
        """
        This view should return a list of all the report_param
        for the currently authenticated client.
        """
        user = self.request.user
        return MongoModels.ReportPSentimentPlanteamientos.objects.filter(client=user.cliente.id)

    def create(self, request, *args, **kwargs):
        user = self.request.user
        serializer = self.get_serializer(data=request.data)
        serializer.client = user.cliente.id
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=True, methods=['get'], url_path="report")
    @swagger_auto_schema(
        responses={200: MongoSerializers.ReportDSentimentSerializer(many=True), 400: "Reporte Id Invalido"})
    def report(self, request, pk):
        """
        Devuelve los resultados del reporte
        """
        message = "muy bien"
        return Response(message)


@api_view()
@permission_classes([IsAuthenticated])
def planteamientos_sentiment(request):
    data = request.data

    inicio = data.get('inicio')
    fin = data.get('fin')
    delta = data.get('delta')
    delta_type = data.get('delta_type')
    provincia = data.get('provincia')
    municipio = data.get('municipio')
    entidades = data.get('entidades')

    if inicio is None:
        raise KeyError('inicio no está presente en la petición')

    if fin is None:
        raise KeyError('fin no está presente en la petición')

    if delta is None:
        raise KeyError('delta no está presente en la petición')

    if delta_type is None:
        raise KeyError('delta_type no está presente en la petición')

    if provincia is None or (type(provincia) == str and provincia != "Todas"):  # TODO check if provincia is an array
        raise KeyError('provincia no está presente en la petición o su formato es incorrecto')

    if municipio is None or (type(municipio) == str and municipio != "Todos"):  # TODO check if municipio is an array
        raise KeyError('municipio no está presente en la petición o su formato es incorrecto')

    if entidades is None or (type(entidades) == str and entidades != "Todas"):  # TODO check if entidades is an array
        raise KeyError('entidades no está presente en la petición o su formato es incorrecto')

    if provincia == "Todas":
        provincia = None

    if municipio == "Todos":
        municipio = None

    if entidades == "Todas":
        entidades = None

    inicio = datetime.datetime.strptime(inicio, '%d/%m/%Y %H:%M:%S')
    fin = datetime.datetime.strptime(fin, '%d/%m/%Y %H:%M:%S')
    report = SentimentService.build_planteamientos_report(provincia, municipio, entidades, inicio,
                                                          fin, delta, delta_type)

    return Response(report)
