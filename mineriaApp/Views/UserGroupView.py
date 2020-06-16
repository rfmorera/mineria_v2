from django.contrib.auth.models import User, Group, Permission
from rest_condition import Or
from rest_framework import viewsets, permissions
from mineriaApp.Serializers.MySQLSerializers import UserSerializer, GroupSerializer, PermissionSerializer
from mineriaApp.Security.GroupsPermission import IsAdminGroup, IsSuperAdminGroup
from rest_framework.authentication import TokenAuthentication


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, Or(IsAdminGroup, IsSuperAdminGroup)]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, Or(IsAdminGroup, IsSuperAdminGroup)]


class PermissionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows permissions to be viewed or edited.
    """
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, Or(IsAdminGroup, IsSuperAdminGroup)]

