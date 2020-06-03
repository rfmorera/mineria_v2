from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from mineriaApp.Services.SentimentService import SentimentService
import datetime

@api_view()
@permission_classes([IsAuthenticated])
def timeline_sentiment(request):
    inicio = request.GET.get('inicio', None)
    fin = request.GET.get('fin', None)
    delta = request.GET.get('delta', None)
    delta_type = request.GET.get('delta_type', None)
    entrada_id = request.GET.get('entrada_id', None)

    if inicio is None:
        raise KeyError('inicio no está presente en la petición')

    if fin is None:
        raise KeyError('fin no está presente en la petición')

    if delta is None:
        raise KeyError('delta no está presente en la petición')

    if entrada_id is None:
        raise KeyError('entrada_id no está presente en la petición')

    if delta_type == 'semana':
        timedelta = datetime.timedelta(weeks=int(delta))
    elif delta_type == 'dia':
        timedelta = datetime.timedelta(days=int(delta))
    elif delta_type == 'hora':
        timedelta = datetime.timedelta(hours=int(delta))
    else:
        timedelta = datetime.timedelta(minutes=int(delta))

    inicio = datetime.datetime.strptime(inicio, '%d/%m/%YT%H:%M:%S')
    fin = datetime.datetime.strptime(fin, '%d/%m/%YT%H:%M:%S')
    report = SentimentService.build_report(entrada_id, inicio, fin, timedelta)
    return Response(report)
