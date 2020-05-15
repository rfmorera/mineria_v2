from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Organismo(models.Model):
    id = models.CharField(max_length=255, null=False, primary_key=True)
    nombre = models.CharField(max_length=255, null=False)
    descripcion = models.CharField(max_length=500, null= False)


class Entidad(models.Model):
    id = models.CharField(max_length=255, null=False, primary_key=True)
    nombre = models.CharField(max_length=255, null=False)
    descripcion = models.CharField(max_length=500, null=False)
    organismoID = models.ForeignKey(Organismo, on_delete=models.CASCADE)


class Aspecto(models.Model):
    id = models.CharField(max_length=255, null=False, primary_key=True)
    nombre = models.CharField(max_length=255, null=False)
    descripcion = models.CharField(max_length=500, null=False)
    entidades = models.ManyToManyField(Entidad)


class Opinion(models.Model):
    id = models.CharField(max_length=255, null=False, primary_key=True)
    nombre = models.CharField(max_length=255, null=False)
    descripcion = models.CharField(max_length=500, null=False)
    entidades = models.ManyToManyField(Entidad)
    aspectos = models.ManyToManyField(Aspecto)


class Cliente(models.Model):
    descripcion = models.CharField(max_length=500, null=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

