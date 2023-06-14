from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Player_stats, Match_history


class PlayerStatsSerializer(ModelSerializer):

    class Meta:
        model = Player_stats 
        fields = ('__all__')

class PlayerStatsdSerializer(ModelSerializer):

    class Meta:
        model = Player_stats 
        fields = ['id', 'player_name', 'player_country', 'player_race', 'rating', 'aligulac_id', 'player_full_name', 'birthday', 'team', 'total_earnings']

class MatchHistorySerializer(serializers.Serializer):
    date = serializers.DateField()
    player_a = PlayerStatsdSerializer()
    player_a_score = serializers.IntegerField()
    player_a_rating = serializers.IntegerField()
    player_b = PlayerStatsdSerializer()
    player_b_score = serializers.IntegerField()
    player_b_rating = serializers.IntegerField() 
    best_of = serializers.IntegerField() 

    
