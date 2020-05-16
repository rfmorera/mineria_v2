from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from mineriaApp.Serializers.MongoSerializers import OpinionSummarySerializer
from mineriaApp.Services.OpinionService import OpinionService
from mineriaApp.Services.EntradaService import EntradaService
from mineriaApp.Services.ResumenService import ResumenService


class ResumenView(APIView):
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Devuelve el de las opiniones"""
        data = request.data

        opinion_type = True
        if 'ids_type' in data.keys() and data["ids_type"] == "entrada":
            opinion_type = False

        if 'ids' in data.keys():
            ids = data['ids']
            if opinion_type:
                summa_list = OpinionService.get_by_ids(ids)
            else:
                summa_list = EntradaService.get_by_ids(ids)

            serializer = OpinionSummarySerializer(summa_list, many=True)

            return Response(serializer.data)
        else:
            raise AttributeError("Falta el parámetro Ids o está vacio")

    def post(self, request):
        data = request.data

        opinion_type = True
        if 'ids_type' in data.keys() and data["ids_type"] == "entrada":
            opinion_type = False

        ratio = 0.3
        if 'ratio' in data.keys():
            ratio = data["ratio"]

        words = None
        if 'words' in data.keys():
            words = data["words"]

        keywords_words = None
        if 'keywords_words' in data.keys():
            keywords_words = data["keywords_words"]

        if 'ids' in data.keys():
            ids = data['ids']

            summa_list = ResumenService.summarize_by_ids(ids, opinion_type, ratio, words, keywords_words)
            serialized_data = OpinionSummarySerializer(summa_list, many=True)

            return Response(serialized_data.data)
        else:
            raise AttributeError("Falta el parámetro Ids o está vacio")
