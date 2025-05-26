from django.db import models

def upload_rider_body(instance, arquivo):
    return f"media/riders/{instance.name}_{instance.id}/{arquivo}_xg"

def upload_rider_icon(instance, arquivo):
    return f"media/riders/{instance.name}_{instance.id}/{arquivo}_sm"

class Rider(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(blank=False, null=False)
    rider_img_body = models.ImageField(upload_to=upload_rider_body)  # Full body rider image
    rider_img_sm = models.ImageField(upload_to=upload_rider_icon)  # Small icon
    rider_img_logo = models.ImageField(upload_to="media/riders/logos")  # Logo image
    tv_show = models.ForeignKey("core.Show", on_delete=models.PROTECT) 

    def __str__(self):
        return f"{self.name}"