from django.db import models
from core.models.show import Show   

class User(models.Model):
    """
    Classe do Usuário

    id: int, representa o identificador do usuário
    username: varchar(15), representa o username do usuário no sistema, vai ser usado também para logar.
    password: varchar, representa a hash da senha do usuário
    img: img, representa a imagem do usuário
    favorite_shows: ligação muitos pra muitos com os shows favoritos do usuário. no máximo 4

    """
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=15,unique=True, null=False, blank=False)
    password = models.CharField(null=False, blank=False)
    img = models.ImageField(upload_to="media/users")
    favorite_shows = models.ManyToManyField(Show)

