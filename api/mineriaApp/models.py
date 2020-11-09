from django.contrib.auth.models import AbstractUser
from django.db import models

from mineriaApp.models_v2.client import Client


class User(AbstractUser):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, default=1)
