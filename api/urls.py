from django.urls import path
from . import views

from rest_framework import routers

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('players/', views.getPlayers, name="players"),
    path('players/<str:pk>', views.getPlayer, name="player"),
    path('match_history/<str:pk>', views.getMatchHistory, name="history"),
]