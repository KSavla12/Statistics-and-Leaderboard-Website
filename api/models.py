from django.db import models

from django.dispatch import receiver
from django.db.models.signals import ( post_save )
from django.db.models.signals import ( pre_save )
from datetime import date

from .modules import countrycodes, elo


class Player_stats(models.Model):
    TERRAN = 'Terran'
    PROTOSS = 'Protoss'
    ZERG = 'Zerg'
    race = [
        (TERRAN, 'Terran'),
        (PROTOSS, 'Protoss'),
        (ZERG, 'Zerg'),
        ]
    player_name = models.CharField(max_length=50)
    player_country = models.CharField(max_length=50)
    player_race = models.CharField(max_length=50, choices=race)
    rating = models.IntegerField(default=1000)
    rating_v_t = models.IntegerField(default=1000) 
    rating_v_z = models.IntegerField(default=1000) 
    rating_v_p = models.IntegerField(default=1000) 

    aligulac_id = models.IntegerField(default=1)
    player_full_name = models.CharField(max_length=50, default='n/a')
    birthday = models.DateField(auto_now=False, auto_now_add=False, default=date.today)
    team = models.CharField(max_length=20, default='n/a')
    total_earnings = models.IntegerField(default=0) 

    @property 
    def rank(id):
        None

    @property
    def country_code(id):
        country1 = id.player_country
        return countrycodes.country_code[country1].lower()

    def __str__(self):
        return self.player_name
        

class Match_history(models.Model):
    # Recording current player stats data
    date = models.DateField(auto_now=False, auto_now_add=False)
    player_a = models.ForeignKey(Player_stats, related_name='player_a', null=True, on_delete=models.CASCADE)
    player_a_score = models.IntegerField(default=0)
    player_a_rating = models.IntegerField(default=1000)
    player_b = models.ForeignKey(Player_stats, related_name='player_b', null=True, on_delete=models.CASCADE)
    player_b_score = models.IntegerField(default=0)
    player_b_rating = models.IntegerField(default=1000)

    player_a_rating_v_t = models.IntegerField(default=1000) ##
    player_a_rating_v_z = models.IntegerField(default=1000) ##
    player_a_rating_v_p = models.IntegerField(default=1000) ##

    player_b_rating_v_t = models.IntegerField(default=1000) ##
    player_b_rating_v_z = models.IntegerField(default=1000) ##
    player_b_rating_v_p = models.IntegerField(default=1000) ##
    best_of = models.IntegerField(default=1)

    def __str__(self):
        return '%s: %s - %s' % (self.date, self.player_a.player_name, self.player_b.player_name)
    
    

@receiver(post_save, sender=Match_history)
def new_player_record(sender, instance, created, *args, **kwargs):
    if created == True:
        instance.player_a_rating = instance.player_a.rating
        instance.player_b_rating = instance.player_b.rating

        instance.player_a_rating_v_t = instance.player_a.rating_v_t ##
        instance.player_a_rating_v_z = instance.player_a.rating_v_z ##
        instance.player_a_rating_v_p = instance.player_a.rating_v_p ##

        instance.player_b_rating_v_t = instance.player_b.rating_v_t ##
        instance.player_b_rating_v_z = instance.player_b.rating_v_z ##
        instance.player_b_rating_v_p = instance.player_b.rating_v_p ##

        instance.save()


@receiver(post_save, sender=Match_history)
def rating_record(sender, instance, created, *args, **kwargs):
    if created == True:
        # Inputs for Elo function
        a = instance.player_a.rating_v_t
        b = instance.player_b.rating_v_t

        if instance.player_b.player_race == "Zerg": 
            a = instance.player_a.rating_v_z
        elif instance.player_b.player_race == "Protoss":
            a = instance.player_a.rating_v_p
        elif instance.player_b.player_race == "Zerg": 
            b = instance.player_a.rating_v_z
        elif instance.player_b.player_race == "Protoss":
            b = instance.player_a.rating_v_p

        Ra = a
        Rb = b
        k = 30
        d = 0      
        if instance.player_a_score > instance.player_b_score:
            d = 1

        player_a_new_rating1 = elo.EloRating(Ra, Rb, k, d)[0] 
        player_b_new_rating1 = elo.EloRating(Ra, Rb, k, d)[1] 


        # Update player ratings depending on matchup
        player_a = Player_stats.objects.get(id=instance.player_a.id)
   
        if instance.player_b.player_race == "Zerg": 
            player_a.rating_v_z = player_a_new_rating1
            player_a.save()
        elif instance.player_b.player_race == "Protoss":
            player_a.rating_v_p = player_a_new_rating1
            player_a.save()
        elif instance.player_b.player_race == "Terran":
            player_a.rating_v_t = player_a_new_rating1
            player_a.save()       

        player_b = Player_stats.objects.get(id=instance.player_b.id)
  
        if instance.player_a.player_race == "Zerg": 
            player_b.rating_v_z = player_b_new_rating1
            player_b.save()
        elif instance.player_a.player_race == "Protoss":
            player_b.rating_v_p = player_b_new_rating1
            player_b.save()
        elif instance.player_a.player_race == "Terran":
            player_b.rating_v_t = player_b_new_rating1
            player_b.save()


        # Update player overall rating
        AA = Player_stats.objects.get(id=instance.player_a.id)
        AA.rating = round((AA.rating_v_t + AA.rating_v_z + AA.rating_v_p)/3)
        AA.save()

        BB = Player_stats.objects.get(id=instance.player_b.id)
        BB.rating = round((BB.rating_v_t + BB.rating_v_z + BB.rating_v_p)/3)
        BB.save()