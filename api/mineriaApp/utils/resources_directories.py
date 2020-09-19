import os

from core import settings

resources_dir = os.path.join(settings.BASE_DIR, 'resources')
models_dir = os.path.join(resources_dir, 'models')
data_dir = os.path.join(resources_dir, 'data')
preprocessed_dir = os.path.join(resources_dir, 'preprocessed')
fixtures_dir = os.path.join(data_dir, 'fixtures')
planteamientos_dir = os.path.join(data_dir, 'planteamientos')
datasets_dir = os.path.join(resources_dir, 'datasets')
