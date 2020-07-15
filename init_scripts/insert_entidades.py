import csv
from mineriaApp.Models.MongoModels import Entidad
from mineriaApp.Services.Utils.CommonDir import data_dir


def insert_entidades():
    addr = data_dir + 'csv_entidad.csv'
    with open(addr, mode='r', encoding="utf8") as csv_file:
        csv_reader = csv.DictReader(csv_file)
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                print(f'Column names are {", ".join(row)}')
                line_count += 1
            ent = Entidad(codigo=row['codentidad'],
                          nombre=row['descentidad'],
                          organismo_id=row['organismo_id'])

            try:
                ent.save()
            except:
                continue

            line_count += 1
        print(f'Processed {line_count} lines.')
