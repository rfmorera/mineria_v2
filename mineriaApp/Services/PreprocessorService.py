"""
Code implementing a preprocessing service for model training - prediction.
@author: Rafael A. Fernandez - rafael.fernandez@desoft.cu
"""


# Cleaning libraries
from bs4 import BeautifulSoup
import re
import itertools
import emoji

#####################################################################################
#
# DATA CLEANING
#
#####################################################################################


class PreprocessorService(object):
    @classmethod
    def _load_dict_smiles(cls):
        return {
            ":‑)": "sonrisa",
            ":-]": "sonrisa",
            ":-3": "sonrisa",
            ":->": "sonrisa",
            "8-)": "sonrisa",
            ":-}": "sonrisa",
            ":)": "sonrisa",
            ":]": "sonrisa",
            ":3": "sonrisa",
            ":>": "sonrisa",
            "8)": "sonrisa",
            ":}": "sonrisa",
            ":o)": "sonrisa",
            ":c)": "sonrisa",
            ":^)": "sonrisa",
            "=]": "sonrisa",
            "=)": "sonrisa",
            ":-))": "sonrisa",
            ":‑D": "sonrisa",
            "8‑D": "sonrisa",
            "x‑D": "sonrisa",
            "X‑D": "sonrisa",
            ":D": "sonrisa",
            "8D": "sonrisa",
            "xD": "sonrisa",
            "XD": "sonrisa",
            ":‑(": "tristeza",
            ":‑c": "tristeza",
            ":‑<": "tristeza",
            ":‑[": "tristeza",
            ":(": "tristeza",
            ":c": "tristeza",
            ":<": "tristeza",
            ":[": "tristeza",
            ":-||": "tristeza",
            ">:[": "tristeza",
            ":{": "tristeza",
            ":@": "tristeza",
            ">:(": "tristeza",
            ":'‑(": "tristeza",
            ":'(": "tristeza",
            ":‑P": "jugueton",
            "X‑P": "jugueton",
            "x‑p": "jugueton",
            ":‑p": "jugueton",
            ":‑Þ": "jugueton",
            ":‑þ": "jugueton",
            ":‑b": "jugueton",
            ":P": "jugueton",
            "XP": "jugueton",
            "xp": "jugueton",
            ":p": "jugueton",
            ":Þ": "jugueton",
            ":þ": "jugueton",
            ":b": "jugueton",
            "<3": "amor"
        }

    @classmethod
    def _load_dict_contractions(cls):
        return {
            "q": "que",
            "pq": "por que",
            "pa": "para",
            "k": "que",
            "sip": "si",
            "sta": "esta",
            "m": "me",
            "x": "por",
            "d": "de"
        }

    @classmethod
    def _strip_accents(cls, text):
        if 'ø' in text or 'Ø' in text:
            # Do nothing when finding ø
            return text
        text = re.sub("[á]", "a", text)
        text = re.sub("[é]", "e", text)
        text = re.sub("[í]", "i", text)
        text = re.sub("[ó]", "o", text)
        text = re.sub("[ú]", "u", text)
        text = re.sub("[ü]", "u", text)
        text = re.sub("[ö]", "o", text)
        text = re.sub("[ä]", "a", text)
        text = re.sub("[ë]", "e", text)
        text = re.sub("[ï]", "i", text)

        text = text.encode('ascii', 'ignore')
        text = text.decode("utf-8")
        return str(text)

    @classmethod
    def text_cleaning_for_sentiment_analysis(cls, input_str):
        """
        Realiza la limpieza de textos.
        Elimina Emojis, Smlies, Signos de puntuación,
        Url, Usuarios, Emails, etc..
        :param input_str: texto a procesar
        :return: texto procesado
        :rtype: String
        """
        if len(input_str) <= 0:
            return "Neutral"
        # Escaping HTML characters
        input_str = BeautifulSoup(input_str, features="html.parser").get_text()
        # Special case not handled previously.
        input_str = input_str.replace('\x92', "'")
        # Removal of hastags/account
        input_str = ' '.join(re.sub("(@[A-Za-z0-9]+)|(#[A-Za-z0-9]+)", " ", input_str).split())
        # Removal of address
        input_str = ' '.join(re.sub("(\w+:\/\/\S+)", " ", input_str).split())
        # Removal of Punctuation
        input_str = ' '.join(re.sub("[\.\,\!\?\:\;\-\=]", " ", input_str).split())
        # Lower case
        input_str = input_str.lower()

        # CONTRACTIONS source: https://en.wikipedia.org/wiki/Contraction_%28grammar%29
        CONTRACTIONS = cls._load_dict_contractions()
        input_str = input_str.replace("’", "'")
        words = input_str.split()
        reformed = [CONTRACTIONS[word] if word in CONTRACTIONS else word for word in words]
        input_str = " ".join(reformed)

        # Standardizing words
        # input_str = ''.join(''.join(s)[:2] for _, s in itertools.groupby(input_str))

        # Deal with smiles
        # source: https://en.wikipedia.org/wiki/List_of_emoticons
        smiles = cls._load_dict_smiles()
        words = input_str.split()
        reformed = [smiles[word] if word in smiles else word for word in words]
        input_str = " ".join(reformed)

        # Deal with emojis
        input_str = emoji.demojize(input_str)

        # Strip accents
        input_str = cls._strip_accents(input_str)
        input_str = input_str.replace(":", " ")
        input_str = ' '.join(input_str.split())

        # DO NOT REMOVE STOP WORDS FOR SENTIMENT ANALYSIS - OR AT LEAST NOT NEGATIVE ONES

        return input_str

    #####################################################################################
    #                                                                                   #
    # DATA PROCESSING                                                                   #
    #                                                                                   #
    #####################################################################################

    @classmethod
    def preprocess(cls, opinions):
        """
        Preprocesa los textos
        :param raw_data: Arreglo de String con los texos
        :rtype: Arreglo de string
        :return: Devuelve tos textos preprocesados
        """
        for i, op in enumerate(opinions):
            opinions[i].content = cls.text_cleaning_for_sentiment_analysis(op.raw_content)
            i = i + 1

        return opinions
