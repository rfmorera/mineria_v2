from mineriaApp.models_v2.source import Source


class FuenteService(object):

    @classmethod
    def save_objects(cls, fuentes):
        for r in fuentes:
            r.save()
        return fuentes

    @classmethod
    def get_by_ids(cls, ids):
        return Source.objects(id__in=ids)
