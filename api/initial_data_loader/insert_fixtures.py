import os

from django.core.management import call_command

from core.settings import BASE_DIR
from mineriaApp.utils.resources_directories import fixtures_dir


def insert_fixtures():
    line = "python \"{0}\" loaddata \"{1}\"".format(os.path.join(BASE_DIR, 'manage.py '),
                                                    os.path.join(fixtures_dir, '*.json'))
    call_command('loaddata', os.path.join(fixtures_dir, '*.json'), verbosity=0)
    print(line)
    # os.system(line)
