import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from mineriaApp.Models.MongoModels import Opinion
from mineriaApp.Serializers.MongoSerializers import OpinionSerializer
from mineriaApp.Services.OpinionService import OpinionService
from mineriaApp.Services.PreprocessorService import PreprocessorService


class OpinionView(APIView):
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Devuelve las opiniones"""
        data = request.data

        if 'ids' in data.keys():
            ids = data['ids']
            op_list = OpinionService.get_by_ids(ids)
            serializer = OpinionSerializer(op_list, many=True)
        else:
            raise AttributeError("Falta el parámetro Ids o está vacio")

        return Response(serializer.data)

    def post(self, request):
        """Inserta las opiniones"""
        data = request.data

        opinions_raw = [Opinion(raw_content=r) for r in data]

        opinions = PreprocessorService.preprocess(opinions_raw)
        opinions_saved = OpinionService.save_opinions(opinions)

        op_ids = [str(op.id) for op in opinions_saved]

        content = {"ids": op_ids}
        return Response(content)
