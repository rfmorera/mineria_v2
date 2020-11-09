from rest_condition import Or
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_mongoengine import viewsets

from mineriaApp.models_v2.entry import Entry
from mineriaApp.permissions.GroupsPermission import IsManagerGroup, IsAdminGroup, IsSnifforGroup, IsReportMakerGroup
from mineriaApp.serializers.entry import EntrySerializer, CreateEntrySerializer


class EntryView(viewsets.ModelViewSet):
    queryset = Entry.objects.all().order_by('-date')
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated, Or(IsManagerGroup, IsAdminGroup, IsSnifforGroup, IsReportMakerGroup)]
    serializer_class = EntrySerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateEntrySerializer
        return super().get_serializer_class()

    # TODO: Implement multiplite creaetion
    # TODO: Create Viewset for inherit classes
    # def post(self, request):
    #     """Inserta entradas"""
    #     data = request.data
    #
    #     entradas = []
    #     for r in data:
    #         if "type" in r.keys():
    #             entidades = []
    #             if 'entidades' in r.keys():
    #                 entidades = r['entidades']
    #
    #             if r["type"] == "portal":
    #                 entradas.append(PortalEntry(content=r["content"],
    #                                               fecha=datetime.datetime.strptime(r["fecha"], "%d/%m/%Y"),
    #                                               etiquetas=r["etiquetas"],
    #                                               fuente=r["fuente_id"],
    #                                               entidades=entidades))
    #
    #     entradas = PreprocessorService.preprocess(entradas)
    #     entradas_saved = EntradaService.save_opinions(entradas)
    #
    #     ent_ids = [str(ent.id) for ent in entradas_saved]
    #
    #     content = {"ids": ent_ids}
    #     return Response(content)
