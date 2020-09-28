from rest_condition import Or
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_mongoengine import viewsets

from mineriaApp.models_v2.opinion import Opinion
from mineriaApp.permissions.GroupsPermission import IsSnifforGroup, IsManagerGroup, IsAdminGroup
from mineriaApp.serializers.opinion import OpinionSerializer


class OpinionView(viewsets.ModelViewSet):
    """
    Manejar Opiniones
    """
    queryset = Opinion.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, Or(IsSnifforGroup, IsManagerGroup, IsAdminGroup)]
    serializer_class = OpinionSerializer

    # filterset_fields = ['pk']
    #
    # @swagger_auto_schema(responses={200: OpinionSerializer(many=True)})
    # def get(self, request):
    #     """
    #     Devuelve las opiniones
    #     """
    #     data = request.data
    #
    #     if 'ids' in data.keys():
    #         ids = data['ids']
    #         op_list = OpinionService.get_by_ids(ids)
    #         serializer = OpinionSerializer(op_list, many=True)
    #     else:
    #         return Response("Falta el parámetro Ids o está vacio")
    #
    #     return Response(serializer.data)

    # TODO: Implement multiplite creaetion
    # test_param = openapi.Parameter('test', openapi.IN_QUERY, description="test manual param", type=openapi.TYPE_BOOLEAN)
    # user_response = openapi.Response('response description', examples={"JSON": {"ids": ["string"]}})
    #
    # @swagger_auto_schema(operation_description="descripcion del POST", manual_parameters=[test_param],
    #                      responses={200: user_response})
    # def post(self, request):
    #     """Inserta las opiniones"""
    #     data = request.data
    #
    #     entradaId = None
    #     if 'entradaId' in data.keys():
    #         entradaId = data["entradaId"]
    #
    #     opinions_raw = []
    #     for r in data["opinions"]:
    #         opinions_raw.append(Opinion(content=r, entrada=entradaId))
    #
    #     opinions = PreprocessorService.text_cleaning(opinions_raw)
    #     opinions_saved = OpinionService.save_opinions(opinions)
    #
    #     op_ids = [str(op.id) for op in opinions_saved]
    #
    #     content = {"ids": op_ids}
    #     return Response(content)
