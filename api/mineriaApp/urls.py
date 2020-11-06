"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.urls import path, include, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import routers, permissions
from rest_framework.authentication import BasicAuthentication

from mineriaApp.views import SentimentView, ResumenView, EntradaView, FuenteView, EntityView, \
    PlanteamientoView, OpinionView
from mineriaApp.views import UserGroupView
from mineriaApp.views.Reports import SentimentReport

router = routers.DefaultRouter()
router.register(r'users', UserGroupView.UserViewSet)
router.register(r'groups', UserGroupView.GroupViewSet)
router.register(r'permissions', UserGroupView.PermissionViewSet)
router.register(r'clients', UserGroupView.ClientViewSet)
router.register(r'report-sentiment', SentimentReport.ReportSentimentViewSet)
router.register(r'report-sentiment-planteamiento', SentimentReport.ReportSentimentPlanteamientoViewSet)
router.register(r'planteamiento', PlanteamientoView.PlanteamientoViewSet)
router.register(r'opinion', OpinionView.OpinionView)
router.register(r'entrada', EntradaView.EntradaView)
router.register(r'entidad', EntityView.EntityView)
router.register(r'sources', FuenteView.FuenteView)


schema_view = get_schema_view(
    openapi.Info(
        title="Minería API",
        default_version='v1',
        description="Versión básica",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    url="http://127.0.0.1:8000/api",
    public=True,
    permission_classes=(permissions.IsAuthenticated,),
    authentication_classes=(BasicAuthentication,)
)

urlpatterns = [
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('', include(router.urls)),
    url(r'^auth/', include('djoser.urls')),
    url(r'^auth/', include('djoser.urls.authtoken')),
    path('sentiment', SentimentView.SentimentView.as_view()),
    path('resumen', ResumenView.ResumenView.as_view()),
]
