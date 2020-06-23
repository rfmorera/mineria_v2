from django.contrib.auth.models import Group, Permission
from rest_condition import Or
from rest_framework import viewsets, permissions
from mineriaApp.Serializers.MySQLSerializers import UserSerializer, GroupSerializer, \
                                                    PermissionSerializer, ClientSerializer
from mineriaApp.Security.GroupsPermission import IsAdminGroup, IsSuperAdminGroup
from mineriaApp.models import User, Client


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by('-date_joined')

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return User.objects.filter(cliente=user.cliente).order_by('-date_joined')

    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, Or(IsAdminGroup, IsSuperAdminGroup)]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated, Or(IsAdminGroup, IsSuperAdminGroup)]


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

