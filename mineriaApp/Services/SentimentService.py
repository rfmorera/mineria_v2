import mongoengine
from mineriaApp.Models.MongoModels import Sentiment, Opinion
from mineriaApp.Services.FastTextPredictionService import FastTextPrediction
from mineriaApp.Services.Utils.Enum import InferenceModelsEnum
from mineriaApp.Services.OpinionService import OpinionService


class SentimentService(object):
    """
    Realiza análisis de sentimientos sobre opiniones
    """
    @classmethod
    def insert_sentiments(cls, ids, predictions):
        """
        Insertar en la colección Sentiment los resultados de las predicciones
        vinculados a los Ids externos
        :rtype: Void, only store in DB
        :param ids: External Sentiment Id from API DB
        :param predictions: the resulting predictions, map each Id to predictions
        """
        for i, r in enumerate(predictions):

            sent = Sentiment.create(ids[i], r)
            sent.save()

    @classmethod
    def get_sentiment_by_id(cls, id):
        return Sentiment.objects(external_id=id).first()

    @classmethod
    def get_sentiment_by_ids(cls, ids):
        return Sentiment.objects(external_id__in=ids)

    @classmethod
    def inference_sentiment(cls, ids, inference_enum):
        op_list = OpinionService.get_by_ids(ids)
        sent_list = []
        if inference_enum == InferenceModelsEnum.FastText:
            sent_list = FastTextPrediction.predict(op_list)

        sent_list = cls.save_sentiment(sent_list)

        for i, op in enumerate(op_list):
            op.sentiment = sent_list[i]

        OpinionService.save_opinions(op_list)

        return op_list

    @classmethod
    def save_sentiment(cls, sent_list):
        for sent in sent_list:
            sent.save()

        return sent_list

    @classmethod
    def _construir_reporte(cls, ent_id, start_date, end_date):
        opinions = OpinionService.get_between_dates(ent_id, start_date, end_date)

        tot = len(opinions)
        pos = neg = 1  # to avoid division by zero
        neu = 0
        for r in opinions:
            if r.sentiment == 'POSITIVE':
                pos += 1
            elif r.sentiment == 'NEGATIVE':
                neg += 1
            elif r.sentiment == 'NEUTRAL':
                neu += 1

        if pos > neg:
            ratio = pos / neg
        elif pos < neg:
            ratio = -1 * neg / pos
        else:
            ratio = 0

        pos -= 1
        neg -= 1

        return tot, pos, neg, neu, ratio
