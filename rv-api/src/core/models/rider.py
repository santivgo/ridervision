from django.db import models
from core.models.show import Show

#mesmo bo que deu no upload das imagem do show

def upload_rider_body(instance, arquivo):
    return f"media/riders/{instance.name}_{instance.id}/{arquivo}_xg"

def upload_rider_icon(instance, arquivo):
    return f"media/riders/{instance.name}_{instance.id}/{arquivo}_sm"


class Rider(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(blank=False, null=False)
    rider_img_body = models.ImageField(upload_to=upload_rider_body) # full body rider image
    rider_img_sm = models.ImageField(upload_to=upload_rider_icon) # full body rider image
    tv_show = models.ForeignKey(Show, on_delete=models.PROTECT)
    
    def __str__(self):
        return f"{self.name}"

class RiderForm(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(blank=False, null=False)
    rider = models.ForeignKey(Rider, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.name}"