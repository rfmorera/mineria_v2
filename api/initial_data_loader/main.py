import os

from mongoengine import connect
from initial_data_loader import insert_entidades, insertar_planteamientos


def main():
    """
    Insertar todos los datos iniciales, migraciones de Bases de Datos de Gobierno
    :return:
    """

    print(BASE_DIR)
    connect(
        db='NLPStore',
        host="mongodb://localhost:27017/"
    )

    insert_entidades.insert_entidades()

    insertar_planteamientos.insertar_provincias()

    insertar_planteamientos.insertar_planteamientos()


if __name__ == '__main__':
    main()
