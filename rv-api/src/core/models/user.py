from django.db import models
from core.utils.upload_img import upload_img
from core.models.show import Show

class User(models.Model):
    """
    Classe do Usuário

    id: int, representa o identificador do usuário
    username: varchar(15), representa o username do usuário no sistema, vai ser usado também para logar.
    password: varchar, representa a hash da senha do usuário
    img: img, representa a imagem do usuário
    favorite_shows: ligação muitos pra muitos com os shows favoritos do usuário. no máximo 4
    favorite_riders: ligação muitos pra muitos com os riders favoritos do usuário.
    
    """
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=15,unique=True, null=False, blank=False)
    password = models.CharField(null=False, blank=False)
    img = models.ImageField(upload_to=upload_img)

    #   Evitando imports circulares
    favorite_shows = models.ManyToManyField('core.Show', blank=True)
    favorite_riders = models.ManyToManyField('core.Rider', blank=True)

    def __str__(self):
        return f"{self.username}"

class FavoriteShow(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    show = models.ForeignKey(Show, on_delete=models.CASCADE)
    fav_riders = models.ManyToManyField(Show, related_name="fav_shows")
    show_review = models.CharField(blank=True, null=False)
