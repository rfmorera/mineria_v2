import os

from mongoengine import connect, disconnect
from initial_data_loader import insert_entidades, insertar_planteamientos, insert_fixtures


def main():
    """
    Insertar todos los datos iniciales, migraciones de Bases de Datos de Gobierno
    :return:
    """

    connect(
        db='NLPStore_v2',
        host="mongodb://localhost:27017/",
        alias='test'
    )

    insert_fixtures.insert_fixtures()

    insert_entidades.insert_entidades()

    insertar_planteamientos.insertar_provincias()

    insertar_planteamientos.insertar_planteamientos()


if __name__ == '__main__':
    main()
