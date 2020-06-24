from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from mineriaApp.Serializers.MongoSerializers import ReportParamSerializer
from mineriaApp.Services.SentimentService import SentimentService
import datetime
from rest_condition import Or, And
from rest_framework import viewsets, permissions
from rest_framework import filters
from mineriaApp.Models.MongoModels import ReportParam
from mineriaApp.Security.GroupsPermission import IsAdminGroup, IsReportMakerGroup, IsManagerGroup, IsSafeRequest, IsReportViewerGroup
from rest_framework import status


class ReportParamViewSet(viewsets.ModelViewSet):
    """
        API endpoint that allows reports to be viewed or edited.
    """
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]

    search_fields = ['name', 'description', 'type']  # TODO: check  this
    ordering_fields = ['name', 'inicio', 'delta_type', 'type']
    ordering = ['name']  # Default ordering

    queryset = ReportParam.objects.none()
    permission_classes = [permissions.IsAuthenticated, Or(IsAdminGroup, IsReportMakerGroup, IsManagerGroup,
                                                          And(IsSafeRequest, IsReportViewerGroup))]
    serializer_class = ReportParamSerializer

    def get_queryset(self):
        """
        This view should return a list of all the report_param
        for the currently authenticated client.
        """
        user = self.request.user
        return ReportParam.objects.filter(client=user.cliente.id)

    def create(self, request, *args, **kwargs):
        user = self.request.user
        data = request.data
        data['client'] = user.cliente.id
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


@api_view()
@permission_classes([IsAuthenticated])
def timeline_sentiment(request):
    data = request.data
    
    inicio = data.get('inicio')
    fin = data.get('fin')
    delta = data.get('delta')
    delta_type = data.get('delta_type')
    entradas_id = data.get('entradas_id')

    if inicio is None:
        raise KeyError('inicio no está presente en la petición')

    if fin is None:
        raise KeyError('fin no está presente en la petición')

    if delta is None:
        raise KeyError('delta no está presente en la petición')

    if entradas_id is None:
        raise KeyError('entradas_id no está presente en la petición')

    if delta_type is None:
        raise KeyError('delta_type no está presente en la petición')

    inicio = datetime.datetime.strptime(inicio, '%d/%m/%Y %H:%M:%S')
    fin = datetime.datetime.strptime(fin, '%d/%m/%Y %H:%M:%S')
    report = SentimentService.build_report(entradas_id, inicio, fin, delta, delta_type)
    return Response(report)


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
