from drf_yasg.utils import swagger_auto_schema
from rest_condition import Or
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from mineriaApp.Models.MongoModels import Planteamiento
from mineriaApp.Security.GroupsPermission import IsAdminGroup, IsSuperAdminGroup
from mineriaApp.Serializers.MongoSerializers import PlanteamientoSerializer
from mineriaApp.Services.ClassifierEntidadService import ClassifierEntidadService


class PlanteamientoViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Planteamiento.objects.all()
    serializer_class = PlanteamientoSerializer
    permission_classes = [permissions.IsAuthenticated, Or(IsAdminGroup, IsSuperAdminGroup)]

    @action(detail=True, methods=['get'], url_path="classify-entidad")
    @swagger_auto_schema(
        responses={200: PlanteamientoSerializer(), 400: "Planteamiento Id Invalido"})
    def classify_entidad(self, request, pk):
        """
        Infiera la entidad relacionada con el planteamiento
        """
        plant = Planteamiento.objects.get(pk=pk)

        plant = ClassifierEntidadService.predict([plant])
        serializer = PlanteamientoSerializer(plant[0])

        return Response(serializer.data)

