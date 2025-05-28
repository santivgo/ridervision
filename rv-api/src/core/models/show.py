from django.db import models
from core.models.user import User
from django.core.validators import MinValueValidator, MaxValueValidator
from core.utils.upload_img import upload_img

class Show(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(blank=False, null=False)
    year = models.IntegerField(validators=[MinValueValidator(1800)])
    synopsis = models.CharField(blank=True, null=False)
    show_img_xg = models.ImageField(upload_to=upload_img) # poster
    show_img_sm = models.ImageField(upload_to=upload_img) # icons

class FavoriteShow(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    show = models.ForeignKey(Show, on_delete=models.CASCADE)
    fav_riders = models.ManyToManyField(Show, related_name="fav_shows")
    show_review = models.CharField(blank=True, null=False)

