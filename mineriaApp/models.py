from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class Organismo(models.Model):
    id = models.CharField(max_length=255, null=False, primary_key=True)
    nombre = models.CharField(max_length=255, null=False)
    descripcion = models.CharField(max_length=500, null= False)


class Client(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255, null=False)
    descripcion = models.CharField(max_length=500, default="")


class User(AbstractUser):
    cliente = models.ForeignKey(Client, on_delete=models.CASCADE, default=1)
