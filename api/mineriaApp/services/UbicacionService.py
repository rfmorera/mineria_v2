from mineriaApp.models_v2.region import Region
from mineriaApp.models_v2.super_region import SuperRegion


def get_all_superregions():
    return SuperRegion.objects().all().values_list('id')


def get_all_regions():
    return Region.objects().all().values_list('id')
