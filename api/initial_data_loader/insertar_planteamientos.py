import os

import pandas as pd
from unidecode import unidecode

from mineriaApp.models_v2.entity import Entidad
from mineriaApp.models_v2.entrada import PlanteamientoEntrada, Fuente
from mineriaApp.models_v2.municipio import Municipio
from mineriaApp.models_v2.opinion import Planteamiento
from mineriaApp.models_v2.provincia import Provincia
from mineriaApp.services.PreprocessorService import PreprocessorService
from mineriaApp.utils.resources_directories import planteamientos_dir


def insertar_provincias():
    nom = ['Pinar del Río',
           'Artemisa',
           'La Habana',
           'Mayabeque',
           'Matanzas',
           'Villa Clara',
           'Cienfuegos',
           'Sancti Spiritus',
           'Ciego de Ávila',
           'Camagüey',
           'Las Tunas',
           'Holguín',
           'Granma',
           'Santiago de Cuba',
           'Guantánamo']

    for r in nom:
        Provincia(nombre=r, normalized=unidecode(r).upper()).save()


def insertar_planteamientos():
    for i in range(1, 10, 1):
        addr = os.path.join(planteamientos_dir, str(i) + '.xlsx')
        print(addr)
        df = pd.read_excel(addr)

        for index, row in df.iterrows():

            muni = row['descmun']
            prov = row['descprov']
            if i != 3 and prov == 'GRANMA':
                continue

            prov_q = Provincia.objects(normalized=prov).first()
            muni_q = Municipio.objects(nombre=muni, provincia=prov_q.id).first()

            if muni_q is None:
                muni_q = Municipio(nombre=muni, provincia=prov_q)
                muni_q.save()

            plane_q = PlanteamientoEntrada.objects(municipio=muni_q.id, provincia=prov_q.id).first()

            if plane_q is None:
                fuen_q = Fuente.objects(name='GOBELECT-' + prov).first()

                if fuen_q is None:
                    fuen_q = Fuente(name='GOBELECT-' + prov, description='GOBELECT-' + prov)
                    fuen_q.save()

                plane_q = PlanteamientoEntrada(titulo='Planteamientos-{0}-{1}'.format(prov, muni),
                                               provincia=prov_q,
                                               municipio=muni_q,
                                               fuente=fuen_q)
                plane_q.save()

            enti = row['codentidad']
            enti_q = Entidad.objects(codigo=enti).first()

            if enti_q is None:
                enti_q = Entidad(codigo=enti,
                                 nombre=row['descentidad'])
                enti_q.save()

            plant = Planteamiento(content=str(row['descplanteamiento']),
                                  processed_content=PreprocessorService.text_cleaning_for_sentiment_analysis(
                                      str(row['descplanteamiento'])),
                                  entrada=plane_q,
                                  fecha=row['fecha'].date(),
                                  entidades=[enti_q])
            plant.save()
