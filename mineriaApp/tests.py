# Create your tests here.
from mongoengine import connect

from mineriaApp.Services.ClassifierEntidadService import ClassifierEntidadService

connect(
    db='NLPStore',
    host="mongodb://localhost:27017/"
)


def do_it():
    ClassifierEntidadService.ftt_train_model()

do_it()