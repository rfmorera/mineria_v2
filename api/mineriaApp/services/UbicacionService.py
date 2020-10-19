from mineriaApp.models_v2.mongo_models import Provincia, Municipio


def get_all_provincias():
    return Provincia.objects().all().values_list('id')


def get_all_municipios():
    return Municipio.objects().all().values_list('id')
