"""
FastText prediction service
@author: Rafael A. Fernandez - rafael.fernandez@desoft.cu
"""
import os

import fasttext
# Tweet lexicon sentiment analysis
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

from mineriaApp.models.mongo_models import Sentiment
from mineriaApp.utils import resources_directories

analyser = SentimentIntensityAnalyzer()

SENTIMENT_THRESHOLD = 0.40


class FastTextPrediction(object):
    model = None

    # @classmethod
    # def __init__(cls, model_name):
    #     cls.model = fasttext.load_model(CommonDir.models_dir + model_name)

    @classmethod
    def get_models(cls, model_name="model-fastText-es.ftz"):
        model_selected = None

        """Get the model object for this instance, loading it if it's not already loaded."""
        if cls.model is None:  # and language.lower() =="en":
            cls.model = fasttext.load_model(os.path.join(resources_directories.models_dir, model_name))

        model_selected = cls.model

        return model_selected

    @classmethod
    def predict(cls, opinions):
        """
        Dado un arreglo de opiniones devuelve los sentimientos asociados
        :param opinions: Opinions array with opinions
        :return: JSON array of opinions with sentiments
        :rtype: object
        """

        clf = cls.get_models()

        predictions = clf.predict([op.processed_content for op in opinions], k=3)

        sent_list = []
        for i in range(len(predictions[0])):
            sent = cls.process_predictions(predictions[0][i], predictions[1][i], opinions[i].processed_content)
            sent_list.append(sent)

        return sent_list

    @classmethod
    def process_predictions(cls, label, prob, text):
        """
        Procesa la predicción y intenta evitar las neutras
        :param label: Etiqueta de mayor probabilidad
        :param prob: Valor de pertenencia a cada Sentimiento
        :param text: Texto de la opinión procesada
        :return: Retorna la clase de mayor pertenencia, y los resultados del resto
        :rtype: JSON sentiment
        """
        t = {
            'prob': list(prob),
            'label': list(label)
        }

        score = {}
        if len(t['label']) > 0 and t['label'][0] != "__label__":
            score[t['label'][0].replace('__label__', '').title()] = t['prob'][0]
        if len(t['label']) >= 2 and t['label'][1] != "__label__":
            score[t['label'][1].replace('__label__', '').title()] = t['prob'][1]
        if len(t['label']) >= 3 and t['label'][2] != "__label__":
            score[t['label'][2].replace('__label__', '').title()] = t['prob'][2]

        if not 'MIXED'.title() in score:
            score['MIXED'.title()] = 0
        if not 'POSITIVE'.title() in score:
            score['POSITIVE'.title()] = 0
        if not 'NEGATIVE'.title() in score:
            score['NEGATIVE'.title()] = 0
        if not 'NEUTRAL'.title() in score:
            score['NEUTRAL'.title()] = 0

        final_sentiment = t['label'][0].replace('__label__', '').upper()

        # REDUCE NEUTRAL BY UPRANKING NEXT SENTIMENT IF ABOVE A THRESHOLD
        if final_sentiment == "NEUTRAL":
            if len(t['label']) >= 2 and len(t['prob']) >= 2:  # check if exist
                if t['label'][1].upper() in ['__LABEL__NEGATIVE', '__LABEL__POSITIVE'] \
                        and t['prob'][1] > SENTIMENT_THRESHOLD:
                    final_sentiment = t['label'][1].replace('__label__', '').upper()

        # PREPARING OUTPUT
        if final_sentiment == "":
            final_sentiment = 'NEUTRAL'.upper()

        # VADER SENTIMENT ANALYSIS IF SENTIMENT IS NEUTRAL
        # positive sentiment: compound score >= 0.05
        try:
            if final_sentiment == "NEUTRAL":
                vader = analyser.polarity_scores(text)
                score_temp = {}
                if vader["compound"] > 0.05 and vader["neu"] < 0.50:
                    final_sentiment = "POSITIVE"
                    score_temp['POSITIVE'.title()] = vader["pos"] * -1
                    score_temp['NEGATIVE'.title()] = vader["neg"] * -1
                    score_temp['NEUTRAL'.title()] = vader["neu"] * -1
                    score_temp['MIXED'.title()] = 0
                    score = score_temp
                elif vader["compound"] < -0.05 and vader["neu"] < 0.50:
                    final_sentiment = "NEGATIVE"
                    score_temp['POSITIVE'.title()] = vader["pos"] * -1
                    score_temp['NEGATIVE'.title()] = vader["neg"] * -1
                    score_temp['NEUTRAL'.title()] = vader["neu"] * -1
                    score_temp['MIXED'.title()] = 0
                    score = score_temp

        except Exception as e:
            print("Error Vader" + str(e))

        result = Sentiment(sentiment=str(final_sentiment))
        result.sentiment_scores = score

        return result
