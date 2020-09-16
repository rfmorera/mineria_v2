from summa import keywords
from summa import summarizer

from mineriaApp.services.EntradaService import EntradaService
from mineriaApp.services.OpinionService import OpinionService


class ResumenService(object):
    @classmethod
    def summarize_by_ids(cls, ids, opinion_type, ratio=0.3, words=None, keywords_words=None):

        if opinion_type:
            op_list = OpinionService.get_by_ids(ids)
        else:
            op_list = EntradaService.get_by_ids(ids)

        for op in op_list:
            op.resumen = summarizer.summarize(op.content, language='spanish', ratio=ratio, words=words)
            op.keywords = keywords.keywords(op.content, language='spanish', split=True, ratio=ratio,
                                            words=keywords_words)
            if op.keywords == "":
                op.keywords = "Opss!! No ha sido posible extraer palabras claves."

            if op.resumen == "":
                op.resumen = "El texto es breve o no se ha podido generar un resumen. Lo sentimos."

        OpinionService.save_opinions(op_list)

        return op_list
