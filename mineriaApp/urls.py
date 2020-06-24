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
from django.urls import path, include, re_path
from mineriaApp.Views import HelloView
from mineriaApp.Views import UserGroupView
from mineriaApp.Views import SentimentView, ResumenView, OpinionView, EntradaView, FuenteView, EntidadView
from mineriaApp.Views.Reports import SentimentReport
from rest_framework import routers
from rest_framework import permissions
from rest_framework.authentication import BasicAuthentication, TokenAuthentication
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from mineriaApp.Views.Reports import SentimentReport

router = routers.DefaultRouter()
router.register(r'users', UserGroupView.UserViewSet)
router.register(r'groups', UserGroupView.GroupViewSet)
router.register(r'permissions', UserGroupView.PermissionViewSet)
router.register(r'clients', UserGroupView.ClientViewSet)
router.register(r'report-sentiment', SentimentReport.ReportSentimentViewSet, basename="Reporte Parámetros")

schema_view = get_schema_view(
    openapi.Info(
        title="Minería API",
        default_version='v1',
        description="Versión básica",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    urlconf='mineriaApp.urls',
    public=True,
    permission_classes=(permissions.IsAuthenticated,),
    authentication_classes=(BasicAuthentication, TokenAuthentication)
)

urlpatterns = [
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    # path('', HelloView.HelloView.as_view()),
    path('', include(router.urls)),
    path('opinion', OpinionView.OpinionView.as_view(), name="opinion_handler"),
    path('sentiment', SentimentView.SentimentView.as_view()),
    path('resumen', ResumenView.ResumenView.as_view()),
    path('entrada', EntradaView.EntradaView.as_view()),
    path('fuente', FuenteView.FuenteView.as_view()),
    path('entidad', EntidadView.EntidadView.as_view()),
    path('reporte/sentimiento-timeline', SentimentReport.timeline_sentiment),
    path('reporte/planteamiento-sentimiento', SentimentReport.planteamientos_sentiment)
]
