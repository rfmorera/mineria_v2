import json

from drf_yasg import openapi
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from mineriaApp.Models.MongoModels import Opinion
from mineriaApp.Security.GroupsPermission import IsSnifforGroup, IsManagerGroup, IsAdminGroup
from mineriaApp.Serializers.MongoSerializers import OpinionSerializer
from mineriaApp.Services.OpinionService import OpinionService
from mineriaApp.Services.PreprocessorService import PreprocessorService
from rest_condition import Or
from drf_yasg.utils import swagger_auto_schema


class OpinionView(APIView):
    """
    Manejar Opiniones
    """
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated, Or(IsSnifforGroup, IsManagerGroup, IsAdminGroup)]

    @swagger_auto_schema(responses={200: OpinionSerializer(many=True)})
    def get(self, request):
        """
        Devuelve las opiniones
        """
        data = request.data

        if 'ids' in data.keys():
            ids = data['ids']
            op_list = OpinionService.get_by_ids(ids)
            serializer = OpinionSerializer(op_list, many=True)
        else:
            return Response("Falta el parámetro Ids o está vacio")

        return Response(serializer.data)

    test_param = openapi.Parameter('test', openapi.IN_QUERY, description="test manual param", type=openapi.TYPE_BOOLEAN)
    user_response = openapi.Response('response description', examples={"JSON": {"ids":["string"]}})

    @swagger_auto_schema(operation_description="descripcion del POST", manual_parameters=[test_param],
                         responses={200: user_response})
    def post(self, request):
        """Inserta las opiniones"""
        data = request.data

        entradaId = None
        if 'entradaId' in data.keys():
            entradaId = data["entradaId"]

        opinions_raw = []
        for r in data["opinions"]:
            opinions_raw.append(Opinion(content=r, entrada=entradaId))

        opinions = PreprocessorService.preprocess(opinions_raw)
        opinions_saved = OpinionService.save_opinions(opinions)

        op_ids = [str(op.id) for op in opinions_saved]

        content = {"ids": op_ids}
        return Response(content)
