from django.db import models
from core.models.show import Show
from core.utils.upload_img import upload_img

class Rider(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(blank=False, null=False)
    main_user = models.CharField(blank=False, null=False, max_length=50)
    rider_img_body = models.ImageField(upload_to=upload_img) # full body rider image
    rider_img_sm = models.ImageField(upload_to=upload_img) # cards
    tv_show = models.ForeignKey(Show, on_delete=models.PROTECT)
    
    def __str__(self):
        return f"{self.name}"

    def __str__(self):
        return f"{self.name}"