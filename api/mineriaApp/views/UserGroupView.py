from django.contrib.auth.models import Group, Permission
from rest_condition import Or
from rest_framework import viewsets, permissions, status, decorators
from rest_framework.response import Response
from rest_framework.settings import api_settings

from mineriaApp.models import Client, User
from mineriaApp.permissions.GroupsPermission import IsAdminGroup, IsSuperAdminGroup
from mineriaApp.serializers.client import ClientSerializer
from mineriaApp.serializers.group import GroupSerializer
from mineriaApp.serializers.permission import PermissionSerializer
from mineriaApp.serializers.user import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, Or(IsAdminGroup, IsSuperAdminGroup)]

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return User.objects.filter(client=user.client).order_by('-date_joined')

    def create(self, request, *args, **kwargs):
        user = self.request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data['client'] = user.client
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated, Or(IsAdminGroup, IsSuperAdminGroup)]

    @decorators.action(detail=False)
    def all(self, request, *args, **kwargs):
        self.pagination_class = None
        result = super(GroupViewSet, self).list(request, *args, **kwargs)
        self.pagination_class = api_settings.DEFAULT_PAGINATION_CLASS
        return result


class PermissionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows permissions to be viewed or edited.
    """
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer
    permission_classes = [permissions.IsAuthenticated, Or(IsAdminGroup, IsSuperAdminGroup)]


class ClientViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows permissions to be viewed or edited.
    """
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [permissions.IsAuthenticated, Or(IsSuperAdminGroup)]
