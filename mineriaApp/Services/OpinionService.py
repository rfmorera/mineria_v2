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

    @classmethod
    def get_between_dates(cls, ent_id, start_date, end_date):
        query = {
            'created_at': {
                '$gte': start_date,
                '$lt': end_date
            }
        }

        return Opinion.objects(__raw__=query)
