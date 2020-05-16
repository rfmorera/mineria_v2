import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from mineriaApp.Models.MongoModels import Opinion
from mineriaApp.Serializers.MongoSerializers import EntradaSerializer
from mineriaApp.Services.EntradaService import EntradaService
from mineriaApp.Services.PreprocessorService import PreprocessorService


class EntradaView(APIView):
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Devuelve las entradas"""
        data = request.data

        if 'ids' in data.keys():
            ids = data['ids']
            ent_list = EntradaService.get_by_ids(ids)
            serializer = EntradaSerializer(ent_list, many=True)
        else:
            raise AttributeError("Falta el parámetro Ids o está vacio")

        return Response(serializer.data)

    def post(self, request):
        """Inserta las opiniones"""
        data = request.data

        opinions_raw = [Opinion(content=r) for r in data]

        opinions = PreprocessorService.preprocess(opinions_raw)
        opinions_saved = EntradaService.save_opinions(opinions)

        op_ids = [str(op.id) for op in opinions_saved]

        content = {"ids": op_ids}
        return Response(content)
