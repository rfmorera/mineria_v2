from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import BasePermission
from rest_condition import ConditionalPermission, C, And, Or, Not


# Groups
class AppGroups:
    SuperAdmin = 'SuperAdmin'
    Admin = 'Admin'
    Sniffer = 'Sniffer'
    ReportViewer = 'ReportViewer'
    ReportMaker = 'ReportMaker'
    Manager = 'Manager'


class IsSuperAdminGroup(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name=AppGroups.SuperAdmin).exists()


class IsAdminGroup(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name=AppGroups.Admin).exists()


class IsSnifforGroup(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name=AppGroups.Sniffer).exists()


class IsReportViewerGroup(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name=AppGroups.ReportViewer).exists()


class IsReportMakerGroup(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name=AppGroups.ReportMaker).exists()


class IsManagerGroup(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name=AppGroups.Manager).exists()
