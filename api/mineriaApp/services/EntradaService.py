from mineriaApp.models_v2.entry import Entry, PlanteamientoEntry


class EntradaService(object):

    @classmethod
    def save_opinions(cls, ent):
        for r in ent:
            r.save()
        return ent

    @classmethod
    def get_by_ids(cls, ids):
        return Entry.objects(id__in=ids)

    @classmethod
    def get_all(cls):
        return Entry.objects().all()

    @classmethod
    def get_entradas_planteamientos(cls, provincia, municipio):
        if provincia is None or provincia == []:
            return PlanteamientoEntry.objects(municipio__in=municipio)

        if municipio is None or municipio == []:
            return PlanteamientoEntry.objects(provincia__in=provincia)

        return PlanteamientoEntry.objects(provincia__in=provincia, municipio__in=municipio)
