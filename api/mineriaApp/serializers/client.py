from rest_framework import serializers

from mineriaApp.models import Client


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'nombre', 'descripcion', 'url']
