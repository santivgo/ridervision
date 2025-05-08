from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Show(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(blank=True, null=True)
    year = models.IntegerField(validators=[MinValueValidator(1800)])
    show_img_xg = models.ImageField(upload_to=f"media/shows/posters/{name}") # poster
    show_img_sm = models.ImageField(upload_to=f"media/shows/icons/{name}_sm") # icons
    show_img_bg = models.ImageField(upload_to=f"media/shows/backgrounds/{name}_bg")