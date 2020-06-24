from datetime import timedelta

from dateutil.relativedelta import relativedelta


def add_delta(dt, delta, delta_type):
    return dt + build_delta(delta, delta_type)


def build_delta(delta, delta_type):
    if delta_type == 'semana':
        td = timedelta(weeks=int(delta))
    elif delta_type == 'dia':
        td = timedelta(days=int(delta))
    elif delta_type == 'hora':
        td = timedelta(hours=int(delta))
    elif delta_type == 'anno':
        td = relativedelta(years=int(delta))
    elif delta_type == 'mes':
        td = relativedelta(months=int(delta))
    else:
        td = timedelta(minutes=int(delta))

    return td
