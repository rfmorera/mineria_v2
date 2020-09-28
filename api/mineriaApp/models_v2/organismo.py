from django.db import models


# Create your models_v2 here.
class Organismo(models.Model):
    id = models.CharField(max_length=255, null=False, primary_key=True)
    nombre = models.CharField(max_length=255, null=False)
    descripcion = models.CharField(max_length=500, null=False)
