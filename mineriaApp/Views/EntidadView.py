import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from mineriaApp.Models.MongoModels import Entidad
from mineriaApp.Serializers.MongoSerializers import EntidadSerializer
from mineriaApp.Services.EntidadService import EntidadService


class EntidadView(APIView):
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Devuelve las entidades"""
        data = request.data

        if 'ids' in data.keys():
            ids = data['ids']
            entidad_list = EntidadService.get_by_ids(ids)
            serializer = EntidadSerializer(entidad_list, many=True)
        else:
            raise AttributeError("Falta el parámetro Ids o está vacio")

        return Response(serializer.data)

    def post(self, request):
        """Inserta las entidades"""
        data = request.data

        entidades = []
        for r in data:
            nombre = r['nombre']
            descripcion = ""
            if 'descripcion' in r.keys():
                descripcion = r['descripcion']

            entidades.append(Entidad(nombre=nombre, descripcion=descripcion))

        entidades_saved = EntidadService.save_objects(entidades)

        entidades_ids = [str(ent.id) for ent in entidades_saved]

        content = {"ids": entidades_ids}
        return Response(content)
