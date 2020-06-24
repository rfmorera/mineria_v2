from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


class HelloView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        content = {'message': 'Holla, bienvenido a nuestro sistema de IA v1. '}
        return Response(content)
