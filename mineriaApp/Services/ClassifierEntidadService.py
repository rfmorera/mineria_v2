import csv
import datetime
import os

import fasttext
import nltk

from mineriaApp.Models.MongoModels import Planteamiento
from mineriaApp.Services.PreprocessorService import PreprocessorService
from mineriaApp.Services.Utils import CommonDir


class ClassifierEntidadService(object):
    # Full path to training data.
    base_dir = CommonDir.base_dir
    training_data_path = os.path.join(base_dir, 'Resources', 'preprocessed', 'planteamientos_classify.train')
    validation_data_path = os.path.join(base_dir, 'Resources', 'preprocessed', 'planteamientos_classify.validation')
    model_path = os.path.join(base_dir, 'Resources', 'models', "planteamientos_classify-es.ftz")

    @classmethod
    def _ftt_transform_instance(cls, row):
        """

        :param row: Texto etiquetado a preprocesar
        :return: devuelve etiqueta + texto
        :rtype: String
        """
        cur_row = []
        # Prefix the index-ed label with __label__
        label = "__label__" + str(row.entidades[0].id)
        cur_row.append(label)
        cur_row.extend(
            nltk.word_tokenize(
                PreprocessorService.text_cleaning_for_sentiment_analysis(row.content.lower(), stop_word=True)))
        return cur_row

    @classmethod
    def ftt_prepare_data(cls, output_file, jump=10, train_flag=True, lim=5 * 10 ** 7):
        """
        Take data from DB, process it and save to a csv file
        :param jump:
        :param train_flag:
        :param output_file: CSV target file
        """
        with open(output_file, 'w') as csvoutfile:
            csv_writer = csv.writer(csvoutfile, delimiter=' ', lineterminator='\n')
            for (i, row) in enumerate(Planteamiento.objects):
                if i > lim:
                    break
                if not (bool(i % jump) ^ train_flag) and row.entidades and row.content != '':
                    row_output = cls._ftt_transform_instance(row)
                    csv_writer.writerow(row_output)

    @classmethod
    def ftt_train_model(cls):

        # Prepare training data
        # cls.ftt_prepare_data(cls.training_data_path)

        # Prepare validation data
        # cls.ftt_prepare_data(cls.validation_data_path, train_flag=False)  # TODO: fix file name

        print('Training start')
        try:
            hyper_params = {"lr": 0.01,
                            "epoch": 100,
                            "wordNgrams": 2,
                            "dim": 80}

            print(str(datetime.datetime.now()) + ' START=>' + str(hyper_params))

            # Train the model.
            model = fasttext.train_supervised(input=cls.training_data_path, **hyper_params)
            print("Model trained with the hyperparameter \n {}\n".format(hyper_params))

            # CHECK PERFORMANCE
            print(str(datetime.datetime.now()) + 'Training complete.' + str(hyper_params))

            result = model.test(cls.training_data_path)
            validation = model.test(cls.validation_data_path)

            # DISPLAY ACCURACY OF TRAINED MODEL
            text_line = str(hyper_params) + ",accuracy:" + str(result[1]) + ",validation:" + str(validation[1]) + '\n'
            print(text_line)

            # quantize a model to reduce the memory usage
            model.quantize(input=cls.training_data_path, qnorm=True, retrain=True, cutoff=100000)
            print("Model is quantized!!")
            model.save_model(cls.model_path)

        except Exception as e:
            print('Exception during training: ' + str(e))
