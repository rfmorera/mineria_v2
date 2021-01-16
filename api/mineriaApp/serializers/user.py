from rest_framework import serializers

from mineriaApp.models import User
from mineriaApp.permissions.GroupsPermission import AppGroups


class DJOSERUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff', 'groups']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'groups', 'last_login', 'is_active']


class CurrentUserSerializer(serializers.ModelSerializer):
    is_admin = serializers.SerializerMethodField()

    is_sniffer = serializers.SerializerMethodField()
    is_report_maker = serializers.SerializerMethodField()
    is_report_viewer = serializers.SerializerMethodField()
    is_manager = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff', 'is_superuser', 'is_admin', 'is_sniffer', 'is_report_maker',
                  'is_report_viewer', 'is_manager', 'first_name', 'last_name']

    def get_is_admin(self, obj):
        return obj.groups.filter(name=AppGroups.Admin).exists()

    def get_is_sniffer(self, obj):
        return obj.groups.filter(name=AppGroups.Sniffer).exists()

    def get_is_report_maker(self, obj):
        return obj.groups.filter(name=AppGroups.ReportMaker).exists()

    def get_is_report_viewer(self, obj):
        return obj.groups.filter(name=AppGroups.ReportViewer).exists()

    def get_is_manager(self, obj):
        return obj.groups.filter(name=AppGroups.Manager).exists()
