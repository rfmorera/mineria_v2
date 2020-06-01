from mongoengine import connect
from init_scripts import insert_entidades


def main():

    connect(
        db='NLPStore',
        host="mongodb://localhost:27017/"
    )

    insert_entidades.insert_entidades()


if __name__ == '__main__':
    main()
