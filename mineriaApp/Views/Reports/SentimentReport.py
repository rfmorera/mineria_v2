from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from mineriaApp.Services.SentimentService import SentimentService
import datetime

@api_view()
@permission_classes([IsAuthenticated])
def timeline_sentiment(request):
    data = request.data
    
    inicio = data['inicio']
    fin = data['fin']
    delta = data['delta']
    delta_type = data['delta_type']
    entrada_id = data['entrada_id']

    if inicio is None:
        raise KeyError('inicio no está presente en la petición')

    if fin is None:
        raise KeyError('fin no está presente en la petición')

    if delta is None:
        raise KeyError('delta no está presente en la petición')

    if entrada_id is None:
        raise KeyError('entrada_id no está presente en la petición')

    inicio = datetime.datetime.strptime(inicio, '%d/%m/%Y %H:%M:%S')
    fin = datetime.datetime.strptime(fin, '%d/%m/%Y %H:%M:%S')
    report = SentimentService.build_report(entrada_id, inicio, fin, delta, delta_type)
    return Response(report)
