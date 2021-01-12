from rest_condition import Or
from rest_framework import decorators
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.settings import api_settings
from rest_framework_mongoengine import viewsets

from mineriaApp.models_v2.entity import Entity
from mineriaApp.permissions.GroupsPermission import IsManagerGroup, IsAdminGroup, IsReportMakerGroup
from mineriaApp.serializers.entity import EntitySerializer


class EntityView(viewsets.ModelViewSet):
    queryset = Entity.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, Or(IsManagerGroup, IsAdminGroup, IsReportMakerGroup)]
    serializer_class = EntitySerializer

    @decorators.action(detail=False)
    def all(self, request, *args, **kwargs):
        self.pagination_class = None
        result = super(EntityView, self).list(request, *args, **kwargs)
        self.pagination_class = api_settings.DEFAULT_PAGINATION_CLASS
        return result

    # def get(self, request):
    #     """Devuelve las entidades"""
    #     data = request.data
    #
    #     if 'ids' in data.keys():
    #         ids = data['ids']
    #         entidad_list = EntidadService.get_by_ids(ids)
    #         serializer = EntitySerializer(entidad_list, many=True)
    #     else:
    #         raise AttributeError("Falta el parámetro Ids o está vacio")
    #
    #     return Response(serializer.data)

    # TODO: Implement multiplite creaetion
    # def post(self, request):
    #     """Inserta las entidades"""
    #     data = request.data
    #
    #     entidades = []
    #     for r in data:
    #         nombre = r['nombre']
    #         descripcion = ""
    #         if 'descripcion' in r.keys():
    #             descripcion = r['descripcion']
    #
    #         entidades.append(Entity(nombre=nombre, descripcion=descripcion))
    #
    #     entidades_saved = EntidadService.save_objects(entidades)
    #
    #     entidades_ids = [str(ent.id) for ent in entidades_saved]
    #
    #     content = {"ids": entidades_ids}
    #     return Response(content)
