import csv
import os

from mineriaApp.models_v2.entity import Entity
from mineriaApp.utils.resources_directories import data_dir


def insert_entidades():
    addr = os.path.join(data_dir, 'csv_entidad.csv')
    with open(addr, mode='r', encoding="utf8") as csv_file:
        csv_reader = csv.DictReader(csv_file)
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                print(f'Column names are {", ".join(row)}')
                line_count += 1
            ent = Entity(code=row['codentidad'],
                         name=row['descentidad'],
                         organism_id=row['organismo_id'])

            try:
                ent.save()
            except:
                continue

            line_count += 1
        print(f'Processed {line_count} lines.')
