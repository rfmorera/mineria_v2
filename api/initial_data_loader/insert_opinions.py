import os

import pandas as pd
from unidecode import unidecode

from mineriaApp.models_v2.entity import Entity
from mineriaApp.models_v2.entry import PlanteamientoEntry, Source
from mineriaApp.models_v2.opinion import Opinion
from mineriaApp.models_v2.region import Region
from mineriaApp.models_v2.super_region import SuperRegion
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
        SuperRegion(name=r, normalized=unidecode(r).upper()).save()


def insert_opinions():
    for i in range(1, 10, 1):
        addr = os.path.join(planteamientos_dir, str(i) + '.xlsx')
        print(addr)
        df = pd.read_excel(addr)

        for index, row in df.iterrows():

            muni = row['descmun']
            prov = row['descprov']
            if i != 3 and prov == 'GRANMA':
                continue

            prov_q = SuperRegion.objects(normalized=prov).first()
            muni_q = Region.objects(name=muni, super_region=prov_q.id).first()

            if muni_q is None:
                muni_q = Region(name=muni, super_region=prov_q)
                muni_q.save()

            plane_q = PlanteamientoEntry.objects(region=muni_q.id, super_region=prov_q.id).first()

            if plane_q is None:
                fuen_q = Source.objects(name='GOBELECT-' + prov).first()

                if fuen_q is None:
                    fuen_q = Source(name='GOBELECT-' + prov, description='GOBELECT-' + prov)
                    fuen_q.save()

                plane_q = PlanteamientoEntry(name='Planteamientos-{0}-{1}'.format(prov, muni),
                                             super_region=prov_q,
                                             region=muni_q,
                                             source=fuen_q)
                plane_q.save()

            enti = row['codentidad']
            enti_q = Entity.objects(codigo=enti).first()

            if enti_q is None:
                enti_q = Entity(code=enti,
                                name=row['descentidad'])
                enti_q.save()

            plant = Opinion(content=str(row['descplanteamiento']),
                            processed_content=PreprocessorService.text_cleaning_for_sentiment_analysis(
                                str(row['descplanteamiento'])),
                            entry=plane_q,
                            date=row['fecha'].date(),
                            entities=[enti_q])
            plant.save()
