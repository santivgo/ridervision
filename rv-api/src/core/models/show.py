from django.db import models
from django.core.validators import MinValueValidator

# tive que fazer isso pq na hora de fazer upload das imagens dava esse erro
# 'A sintaxe do nome do arquivo, do nome do diretório ou do rótulo do volume está incorreta:'

def upload_show_poster(instance, arquivo):
    return f"media/shows/posters/{instance.name}/{arquivo}"

def upload_show_icon(instance, arquivo):
    return f"media/shows/icons/{instance.name}/{arquivo}_sm"

class Show(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(blank=False, null=False)
    year = models.IntegerField(validators=[MinValueValidator(1800)])
    synopsis = models.CharField(blank=True, null=False)
    show_img_xg = models.ImageField(upload_to=upload_show_poster)  # Poster
    show_img_sm = models.ImageField(upload_to=upload_show_icon)  # Icons