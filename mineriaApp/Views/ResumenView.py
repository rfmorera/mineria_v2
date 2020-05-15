from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from mineriaApp.Serializers.MongoSerializers import OpinionSummarySerializer
from mineriaApp.Services.OpinionService import OpinionService
from mineriaApp.Services.ResumenService import ResumenService


class ResumenView(APIView):
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Devuelve el de las opiniones"""
        data = request.data

        if 'ids' in data.keys():
            ids = data['ids']
            summa_list = OpinionService.get_by_ids(ids)
            serializer = OpinionSummarySerializer(summa_list, many=True)

            return Response(serializer.data)
        else:
            raise AttributeError("Falta el parámetro Ids o está vacio")

    def post(self, request):
        data = request.data

        if 'ids' in data.keys():
            ids = data['ids']

            summa_list = ResumenService.summarize_by_ids(ids)
            serialized_data = OpinionSummarySerializer(summa_list, many=True)

            return Response(serialized_data.data)
        else:
            raise AttributeError("Falta el parámetro Ids o está vacio")
