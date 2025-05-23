from django.db import models
from core.models.show import Show

class Rider(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(blank=False, null=False)
    rider_img_body = models.ImageField(f'/media/riders/{name}_{id}_xg') # full body rider image
    rider_img_sm = models.ImageField(f'/media/riders/{name}_{id}_sm') # full body rider image
    rider_img_logo = models.ImageField(f'/media/riders/{name}_{id}_logo') # full body rider image
    tv_show = models.ForeignKey(Show, on_delete=models.PROTECT)

class RiderForm(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(blank=False, null=False)
    rider = models.ForeignKey(Rider, on_delete=models.CASCADE)