from mineriaApp.Models.MongoModels import Entrada, PlanteamientoEntrada
from mineriaApp.Services import UbicacionService


class EntradaService(object):

    @classmethod
    def save_opinions(cls, ent):
        for r in ent:
            r.save()
        return ent

    @classmethod
    def get_by_ids(cls, ids):
        return Entrada.objects(id__in=ids)

    @classmethod
    def get_all(cls):
        return Entrada.objects().all()

    @classmethod
    def get_entradas_planteamientos(cls, provincia, municipio):
        if provincia is None:
            provincia = UbicacionService.get_all_provincias()

        if municipio is None:
            municipio = UbicacionService.get_all_municipios()

        return PlanteamientoEntrada.objects(provincia__in=provincia, municipio__in=municipio)
