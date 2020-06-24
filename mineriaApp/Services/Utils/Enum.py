from enum import Enum


class InferenceModelsEnum(Enum):
    FastText = 1


class TimeDeltaEnum(Enum):
    Minuto1 = 1,
    Minuto3 = 2,
    Minuto5 = 3,
    Minuto10 = 4,
    Minuto15 = 5,
    Minuto30 = 6,
    Hora1 = 10,
    Hora3 = 11,
    Hora6 = 12,
    Hora12 = 13,
    Dia1 = 20,
    Dia7 = 21,
    Mes1 = 30,
    Anno1 = 41
