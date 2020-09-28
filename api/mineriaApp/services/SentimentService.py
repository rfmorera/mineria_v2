import datetime

from mineriaApp.models_v2.report_data import ReportDSentiment
from mineriaApp.models_v2.sentiment import Sentiment
from mineriaApp.services.EntradaService import EntradaService
from mineriaApp.services.FastTextPredictionService import FastTextPrediction
from mineriaApp.services.OpinionService import OpinionService
from mineriaApp.utils import date_time_utils
from mineriaApp.utils.Enum import InferenceModelsEnum


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

        return cls.inference_sentiment(op_list, inference_enum)

    @classmethod
    def inference_sentiment_from_opinions(cls, op_list, inference_enum=None):
        if len(op_list) == 0:
            return []

        done = []
        pending = []
        for op in op_list:
            if op.sentiment is None:
                pending.append(op)
            else:
                done.append(op)

        sentiment_pending = cls._inference_sentiment(pending, inference_enum)

        for i, op in enumerate(pending):
            op.sentiment = sentiment_pending[i]

        OpinionService.save_opinions(pending)

        done.extend(pending)

        return done

    @classmethod
    def _inference_sentiment(cls, op_list, inference_enum=None):
        sent_list = []
        if inference_enum == InferenceModelsEnum.FastText or inference_enum is None:
            sent_list = FastTextPrediction.predict(op_list)

        sent_list = cls.save_sentiment(sent_list)

        return sent_list

    @classmethod
    def save_sentiment(cls, sent_list):
        for sent in sent_list:
            sent.save()

        return sent_list

    @classmethod
    def build_planteamientos_report(cls, param_id, start_date, end_date, delta_value, delta_type, provincias,
                                    municipios, entidades):

        entradas = EntradaService.get_entradas_planteamientos(provincias, municipios)
        reports_entrada = cls.build_report(param_id, entradas, start_date, end_date, delta_value, delta_type,
                                           entidades)

        return reports_entrada

    @classmethod
    def build_report(cls, param_id, entradas_id, start_date, end_date_param, delta_value, delta_type, entidades=None):
        """
        Construye los reportes entre 'start_date' y 'end_date' con
        intervalo de 'timedelta'. Devuelve un resumen general.
        :param ent_ids: Array de Id de las entradas a analizar
        :param start_date: Fecha inicio
        :param end_date: Fecha fin
        :param delta: Cantidad de unidades en cada salto
        :param delta_type: Magnitud de salto
        :return: Dict
        """
        reports = []
        tot = pos = neg = neu = 0
        timedelta = date_time_utils.build_delta(delta_value, delta_type)
        if end_date_param is None or end_date_param > datetime.datetime.now():
            end_date = datetime.datetime.now()
            end_date_param = None
        else:
            end_date = end_date_param

        reports = cls.get_existing_reports(param_id)
        reports = list(reports)
        if reports:
            start_date = reports[-1].fecha_inicio + timedelta

        while start_date < end_date:
            save = True
            if end_date_param is None and start_date + timedelta >= end_date:
                save = False
            r = cls._build_report(param_id, entradas_id, entidades, start_date, start_date + timedelta, save)
            reports.append(r)
            tot += r.total_opinion
            pos += r.total_positive
            neg += r.total_negative
            neu += r.total_neutral
            start_date += timedelta

        ratio = cls.__calc_ratio(pos, neg)

        # TODO: add resumen to report data
        # return {'total': tot, 'positive_total': pos, 'negative_total': neg, 'neutral_total': neu,
        #         'ratio': ratio, 'reports_interval': reports}
        return reports

    @classmethod
    def get_existing_reports(cls, param_id):
        return ReportDSentiment.objects(report_param=param_id).order_by('fecha_inicio')

    @classmethod
    def _build_report(cls, param_id, entradas_id, entidades, start_date, end_date, save):
        opinions = OpinionService.get_between_dates(entradas_id, entidades, start_date, end_date)

        opinions = cls.inference_sentiment_from_opinions(opinions)

        tot = len(opinions)
        pos = neg = 1  # to avoid division by zero
        neu = 0

        for r in opinions:
            if r.sentiment is None:
                continue
            if r.sentiment.sentiment == 'POSITIVE':
                pos += 1
            elif r.sentiment.sentiment == 'NEGATIVE':
                neg += 1
            elif r.sentiment.sentiment == 'NEUTRAL':
                neu += 1

        ratio = cls.__calc_ratio(pos, neg)

        pos -= 1
        neg -= 1
        rep = ReportDSentiment(report_param=param_id, fecha_inicio=start_date, fecha_fin=end_date, total_opinion=tot,
                               total_positive=pos, total_negative=neg, total_neutral=neu, ratio=round(ratio, 2))
        if save:
            rep.save()

        return rep

    @classmethod
    def __calc_ratio(cls, pos, neg):
        if pos > neg:
            ratio = 1.0 * pos / neg
        elif pos < neg:
            ratio = -1.0 * neg / pos
        else:
            ratio = 0

        return ratio
