from summa import summarizer
from summa import keywords
from mineriaApp.Services.OpinionService import OpinionService

class ResumenService(object):
    @classmethod
    def summarize_by_ids(cls, ids):
        op_list = OpinionService.get_by_ids(ids)
        for op in op_list:
            op.resumen = summarizer.summarize(op.content, language='spanish', ratio=0.3)
            op.keywords = keywords.keywords(op.content, language='spanish')

            if op.keywords == "":
                op.keywords = "Opss!! No ha sido posible extraer palabras claves."

            if op.resumen == "":
                op.resumen = "El texto es breve o no se ha podido generar un resumen. Lo sentimos."

        OpinionService.save_opinions(op_list)

        return op_list
