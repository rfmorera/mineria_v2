from django.db import models


class Client(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255, null=False)
    descripcion = models.CharField(max_length=500, default="")

    class Meta:
        verbose_name = 'client'
        verbose_name_plural = 'clients'

    def __str__(self):
        return self.nombre
