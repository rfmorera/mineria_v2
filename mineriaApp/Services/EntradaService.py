from mineriaApp.Models.MongoModels import Entrada


class EntradaService(object):

    @classmethod
    def save_opinions(cls, ent):
        for r in ent:
            r.save()
        return ent

    @classmethod
    def get_by_ids(cls, ids):
        return Entrada.objects(id__in=ids)
