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
from django.urls import path, include
from mineriaApp.Views import HelloView
from mineriaApp.Views import UserGroupView
from mineriaApp.Views import SentimentView, ResumenView, OpinionView, EntradaView, FuenteView, EntidadView
from mineriaApp.Views.Reports import SentimentReport
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'users', UserGroupView.UserViewSet)
router.register(r'groups', UserGroupView.GroupViewSet)
router.register(r'permissions', UserGroupView.PermissionViewSet)


urlpatterns = [
    path('', HelloView.HelloView.as_view()),
    path('', include(router.urls)),
    path('opinion', OpinionView.OpinionView.as_view()),
    path('sentiment', SentimentView.SentimentView.as_view()),
    path('resumen', ResumenView.ResumenView.as_view()),
    path('entrada', EntradaView.EntradaView.as_view()),
    path('fuente', FuenteView.FuenteView.as_view()),
    path('entidad', EntidadView.EntidadView.as_view()),
    path('reporte/sentimiento-timeline', SentimentReport.timeline_sentiment),
    path('reporte/planteamiento-sentimiento', SentimentReport.planteamientos_sentiment)
]
