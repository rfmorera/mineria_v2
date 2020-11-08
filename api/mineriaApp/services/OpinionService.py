from mineriaApp.models_v2.opinion import Opinion


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
    def get_between_dates(cls, entradas_id, entities, start_date, end_date):
        if entities is None or len(entities) == 0:
            return Opinion.objects(entry__in=entradas_id, date__gte=start_date, date__lt=end_date,
                                   processed_content__ne=None)
        else:
            return Opinion.objects(entry__in=entradas_id, date__gte=start_date, date__lt=end_date,
                                   processed_content__ne=None, entities__in=entities)
