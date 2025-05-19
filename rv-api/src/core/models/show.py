from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Show(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(blank=False, null=False)
    year = models.IntegerField(validators=[MinValueValidator(1800)])
    synopsis = models.CharField(blank=True, null=False)
    show_img_xg = models.ImageField(upload_to=f"media/shows/posters/{name}") # poster
    show_img_sm = models.ImageField(upload_to=f"media/shows/icons/{name}_sm") # icons
