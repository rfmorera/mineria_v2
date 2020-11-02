from rest_condition import Or
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from mineriaApp.permissions.GroupsPermission import IsSnifforGroup, IsManagerGroup, IsAdminGroup
from mineriaApp.serializers.opinion import OpinionSentimentSerializer
from mineriaApp.services.OpinionService import OpinionService
from mineriaApp.services.SentimentService import SentimentService
from mineriaApp.utils.Enum import InferenceModelsEnum


class SentimentView(APIView):
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated, Or(IsSnifforGroup, IsManagerGroup, IsAdminGroup)]

    # def get(self, request):
    #     """Devuelve la polaridad de las opiniones"""
    #     data = request.data
    #
    #     if 'ids' in data.keys():
    #         ids = data['ids']
    #         sent_list = OpinionService.get_by_ids(ids)
    #         serializer = OpinionSentimentSerializer(sent_list, many=True)
    #     else:
    #         raise AttributeError("Falta el parámetro Ids o está vacio")
    #
    #     return Response(serializer.data)
    #
    # def post(self, request):
    #     data = request.data
    #
    #     if 'ids' in data.keys():
    #         ids = data['ids']
    #
    #         inference_results = SentimentService.inference_sentiment(ids, InferenceModelsEnum.FastText)
    #         serialized_data = OpinionSentimentSerializer(inference_results, many=True)
    #
    #         return Response(serialized_data.data)
    #     else:
    #         raise AttributeError("Falta el parámetro Ids o está vacio")
