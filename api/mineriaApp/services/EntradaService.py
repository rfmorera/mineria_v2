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
    def get_entradas_planteamientos(cls, super_region, region):
        if super_region is None or super_region == []:
            return PlanteamientoEntry.objects(region__in=region)

        if region is None or region == []:
            return PlanteamientoEntry.objects(super_region__in=super_region)

        return PlanteamientoEntry.objects(super_region__in=super_region, region__in=region)
