from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from mineriaApp.Services.SentimentService import SentimentService
import datetime

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
