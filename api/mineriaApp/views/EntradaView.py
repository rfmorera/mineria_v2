import datetime

from rest_condition import Or
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from mineriaApp.models.MongoModels import PortalEntrada
from mineriaApp.permissions.GroupsPermission import IsManagerGroup, IsAdminGroup, IsSnifforGroup, IsReportMakerGroup
from mineriaApp.serializers.MongoSerializers import EntradaSerializer
from mineriaApp.services.EntradaService import EntradaService
from mineriaApp.services.PreprocessorService import PreprocessorService


class EntradaView(APIView):
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated, Or(IsManagerGroup, IsAdminGroup, IsSnifforGroup, IsReportMakerGroup)]

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
        """Inserta entradas"""
        data = request.data

        entradas = []
        for r in data:
            if "type" in r.keys():
                entidades = []
                if 'entidades' in r.keys():
                    entidades = r['entidades']

                if r["type"] == "portal":
                    entradas.append(PortalEntrada(content=r["content"],
                                                  fecha=datetime.datetime.strptime(r["fecha"], "%d/%m/%Y"),
                                                  etiquetas=r["etiquetas"],
                                                  fuente=r["fuente_id"],
                                                  entidades=entidades))

        entradas = PreprocessorService.preprocess(entradas)
        entradas_saved = EntradaService.save_opinions(entradas)

        ent_ids = [str(ent.id) for ent in entradas_saved]

        content = {"ids": ent_ids}
        return Response(content)
