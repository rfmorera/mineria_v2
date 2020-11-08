from rest_condition import Or
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_mongoengine import viewsets

from mineriaApp.models_v2.source import Source
from mineriaApp.permissions.GroupsPermission import IsManagerGroup, IsAdminGroup
from mineriaApp.serializers.source import FuenteSerializer


class SourceView(viewsets.ModelViewSet):
    queryset = Source.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, Or(IsManagerGroup, IsAdminGroup)]
    serializer_class = FuenteSerializer

    # def get(self, request):
    #     """Devuelve las fuentes"""
    #     data = request.data
    #
    #     if 'ids' in data.keys():
    #         ids = data['ids']
    #         fuente_list = FuenteService.get_by_ids(ids)
    #         serializer = FuenteSerializer(fuente_list, many=True)
    #     else:
    #         raise AttributeError("Falta el parámetro Ids o está vacio")
    #
    #     return Response(serializer.data)

    # TODO: Implement multiplite creaetion
    # def post(self, request):
    #     data = request.data
    #
    #     fuentes = []
    #     for r in data:
    #         if "type" not in r.keys():
    #             fuentes.append(Source(nombre=r["nombre"]))
    #
    #     fuentes_saved = FuenteService.save_objects(fuentes)
    #
    #     fuentes_ids = [str(ent.id) for ent in fuentes_saved]
    #
    #     content = {"ids": fuentes_ids}
    #     return Response(content)
