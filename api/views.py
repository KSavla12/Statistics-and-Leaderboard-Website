from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import PlayerStatsSerializer, MatchHistorySerializer

from .models import Player_stats, Match_history

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    
    routes = [
        {
            'Endpoint': '/players/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of players'
        },
        {
            'Endpoint': '/players/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single player object'
        },
        {
            'Endpoint': '/match_history/',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single player object'
        },
    ]

    return Response(routes)

@api_view(['GET'])
def getPlayers(request):
    players = Player_stats.objects.order_by('-rating')
    serializer = PlayerStatsSerializer(players, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getPlayer(request, pk):
    player = Player_stats.objects.get(id=pk)
    serializer = PlayerStatsSerializer(player, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getMatchHistory(request, pk):
    match_history = Match_history.objects.filter(player_a=pk).order_by('date') | Match_history.objects.filter(player_b=pk).order_by('date')
    serializer = MatchHistorySerializer(match_history, many=True, context= 
        {'request':request})
    return Response(serializer.data)

