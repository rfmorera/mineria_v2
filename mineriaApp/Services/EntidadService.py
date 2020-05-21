from mineriaApp.Models.MongoModels import Entidad


class EntidadService(object):

    @classmethod
    def save_objects(cls, entidades):
        for r in entidades:
            r.save()
        return entidades

    @classmethod
    def get_by_ids(cls, ids):
        return Entidad.objects(id__in=ids)
