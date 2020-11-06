import os
from os import listdir

from core.settings import BASE_DIR
from mineriaApp.utils.resources_directories import fixtures_dir


def insert_fixtures():
    fixtures = listdir(fixtures_dir)
    for f in fixtures:
        print(f)
        line = "python \"{0}\" loaddata \"{1}\"".format(os.path.join(BASE_DIR, 'manage.py '),
                                                        os.path.join(fixtures_dir, f))
        # call_command('loaddata', os.path.join(fixtures_dir, '*.json'), verbosity=0)
        print(line)
        os.system(line)
