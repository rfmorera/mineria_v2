from mineriaApp.models.mongo_models import Fuente


class FuenteService(object):

    @classmethod
    def save_objects(cls, fuentes):
        for r in fuentes:
            r.save()
        return fuentes

    @classmethod
    def get_by_ids(cls, ids):
        return Fuente.objects(id__in=ids)
