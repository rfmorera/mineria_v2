from mineriaApp.models.mongo_models import Opinion


class OpinionService(object):

    @classmethod
    def save_opinions(cls, opinions):
        for r in opinions:
            r.save()
        return opinions

    @classmethod
    def get_by_ids(cls, ids):
        return Opinion.objects(id__in=ids)

    @classmethod
    def get_between_dates(cls, entradas_id, entidades, start_date, end_date):
        if entidades is None or len(entidades) == 0:
            return Opinion.objects(entrada__in=entradas_id, fecha__gte=start_date, fecha__lt=end_date,
                                   processed_content__ne=None)
        else:
            return Opinion.objects(entrada__in=entradas_id, fecha__gte=start_date, fecha__lt=end_date,
                                   processed_content__ne=None, entidades__in=entidades)
