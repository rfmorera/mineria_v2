from mongoengine import connect
from init_scripts import insert_entidades, insertar_planteamientos


def main():

    connect(
        db='NLPStore',
        host="mongodb://localhost:27017/"
    )

    insert_entidades.insert_entidades()

    insertar_planteamientos.insertar_provincias()

    insertar_planteamientos.insertar_planteamientos()


if __name__ == '__main__':
    main()
