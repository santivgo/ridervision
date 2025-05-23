from django.db import models
from core.models.rider import Rider
from core.models.show import Show
from core.models.user import User

from django.core.validators import MinValueValidator, MaxValueValidator

class Show(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(blank=False, null=False)
    year = models.IntegerField(validators=[MinValueValidator(1800)])
    synopsis = models.CharField(blank=True, null=False)
    show_img_xg = models.ImageField(upload_to=f"media/shows/posters/{name}") # poster
    show_img_sm = models.ImageField(upload_to=f"media/shows/icons/{name}_sm") # icons

class FavoriteShow(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    show = models.ForeignKey(Show, on_delete=models.CASCADE)
    fav_rider_1 = models.ForeignKey(Rider, on_delete=models.CASCADE)
    fav_rider_2 = models.ForeignKey(Rider, on_delete=models.CASCADE)
    fav_rider_3 = models.ForeignKey(Rider, on_delete=models.CASCADE)
    show_review = models.CharField(blank=True, null=False)