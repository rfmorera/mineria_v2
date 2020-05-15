from mineriaApp.Models.MongoModels import Opinion


class OpinionService(object):

    @classmethod
    def save_opinions(cls, opinions):
        for r in opinions:
            r.save()
        return opinions

    @classmethod
    def get_by_ids(cls, ids):
        return Opinion.objects(id__in=ids)
