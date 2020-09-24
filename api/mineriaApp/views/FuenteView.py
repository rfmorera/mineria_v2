from rest_condition import Or
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from mineriaApp.models.mongo_models import Fuente
from mineriaApp.permissions.GroupsPermission import IsManagerGroup, IsAdminGroup
from mineriaApp.serializers.MongoSerializers import FuenteSerializer
from mineriaApp.services.FuenteService import FuenteService


class FuenteView(APIView):
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated, Or(IsManagerGroup, IsAdminGroup)]

    def get(self, request):
        """Devuelve las fuentes"""
        data = request.data

        if 'ids' in data.keys():
            ids = data['ids']
            fuente_list = FuenteService.get_by_ids(ids)
            serializer = FuenteSerializer(fuente_list, many=True)
        else:
            raise AttributeError("Falta el parámetro Ids o está vacio")

        return Response(serializer.data)

    def post(self, request):
        """Inserta las entradas"""
        data = request.data

        fuentes = []
        for r in data:
            if "type" not in r.keys():
                fuentes.append(Fuente(nombre=r["nombre"]))

        fuentes_saved = FuenteService.save_objects(fuentes)

        fuentes_ids = [str(ent.id) for ent in fuentes_saved]

        content = {"ids": fuentes_ids}
        return Response(content)
