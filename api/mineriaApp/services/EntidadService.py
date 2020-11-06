from mineriaApp.models_v2.entity import Entity


class EntidadService(object):

    @classmethod
    def save_objects(cls, entidades):
        for r in entidades:
            r.save()
        return entidades

    @classmethod
    def get_by_ids(cls, ids):
        return Entity.objects(id__in=ids)

    @classmethod
    def get_all(cls):
        return Entity.objects().all()
