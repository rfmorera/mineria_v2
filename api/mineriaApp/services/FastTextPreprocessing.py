import csv

import nltk

from mineriaApp.services.SentimentService import SentimentService


class FastTextPreprocessing:
    @classmethod
    def _transform_instance(cls, row):
        """

        :param row: Texto etiquetado a preprocesar
        :return: devuelve etiqueta + texto
        :rtype: String
        """
        cur_row = []
        # Prefix the index-ed label with __label__
        label = "__label__" + row[4]
        cur_row.append(label)
        cur_row.extend(nltk.word_tokenize(SentimentService.text_cleaning_for_sentiment_analysis(row[2].lower())))
        return cur_row

    @classmethod
    def preprocess_file_csv_labeled(cls, input_file, output_file, keep=1):
        """
        Realiza el preprocesamiento de opiniones a partir de un CSV.
        Está enfocado a conjuntos de datos de entrenamiento etiquetados
        Tomar como ejemplo Resource/Datasets/betsentiment

        :param input_file: Archivo fuente de las opiniones etiquetadas
        :param output_file: Archivo destino de las opiniones etiquetadas
        :param keep:
        :rtype: Void, no return
        """
        i = 0
        with open(output_file, 'w') as csvoutfile:
            csv_writer = csv.writer(csvoutfile, delimiter=' ', lineterminator='\n')
            with open(input_file, 'r', newline='') as csvinfile:  # ,encoding='latin1'
                csv_reader = csv.reader(csvinfile, delimiter=',', quotechar='"')
                for row in csv_reader:
                    if row[4] != "MIXED" and row[4].upper() in ['POSITIVE', 'NEGATIVE', 'NEUTRAL'] and row[2] != '':
                        row_output = cls._transform_instance(row)
                        csv_writer.writerow(row_output)
                    i = i + 1
                    if i % 10000 == 0:
                        print(i)
