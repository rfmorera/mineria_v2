from django.http import JsonResponse
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_condition import Or
from rest_framework import decorators
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_mongoengine import viewsets

from mineriaApp.models_v2.sentiment import Sentiment
from mineriaApp.permissions.GroupsPermission import IsSnifforGroup, IsManagerGroup, IsAdminGroup
from mineriaApp.serializers.sentiment import SentimentSerializer


class SentimentView(viewsets.ModelViewSet):
    queryset = Sentiment.objects.all()
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated, Or(IsSnifforGroup, IsManagerGroup, IsAdminGroup)]
    serializer_class = SentimentSerializer

    user_response = openapi.Response('response description', examples=[
        {"total": "integer", "positive": "integer", "negative": "integer", "neutral": "integer"}])

    @decorators.action(detail=False, methods=["GET"])
    @swagger_auto_schema(operation_description="partial_update description override",
                         responses={200: user_response})
    # TODO: improve documentation
    def dashboard_count(self, request):
        query = self.get_queryset()
        total = query.count()
        positive = query.filter(sentiment="POSITIVE").count()
        negative = query.filter(sentiment="NEGATIVE").count()
        neutral = query.filter(sentiment="NEUTRAL").count()

        ans = {"total": total, "positive": positive, "negative": negative, "neutral": neutral}
        return JsonResponse(data=ans)

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
