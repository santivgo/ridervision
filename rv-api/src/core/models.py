from django.core.validators import MinValueValidator
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.db import models

from core.utils.upload_img import uploadImg


class Show(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=False, null=False, unique=True)
    year = models.IntegerField(validators=[MinValueValidator(1800)])
    synopsis = models.CharField(blank=True, null=False)
    show_img_xl = models.ImageField(upload_to=uploadImg)  # poster
    show_img_sm = models.ImageField(upload_to=uploadImg)  # icons
    show_img_banner = models.ImageField(upload_to=uploadImg)  # banners
    show_img_logo = models.ImageField(upload_to=uploadImg)  # logo

    def __str__(self):
        return self.name.split("(", maxsplit=1)[0]


class Rider(models.Model):
    """
    Classe do Rider

    id: int, representa o identificador do Rider
    name: varchar(100), representa o nome do rider
    main_user: varchar(50), representa o nome do usuário do rider
    rider_img_body: imageField, representa a imagem do rider de corpo todo
    rider_img_sm: imageField, representa a imagem da carta do rider
    tv_show: foreignKey, representa o show que o rider pertence.

    """

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=False, null=False)
    main_user = models.CharField(max_length=50, blank=False, null=False)
    rider_img_body = models.ImageField(upload_to=uploadImg)
    rider_img_sm = models.ImageField(upload_to=uploadImg)
    tv_show = models.ForeignKey(Show, on_delete=models.PROTECT)

    def __str__(self):
        return f"{self.name}"


class User(AbstractUser):
    """
    Classe do Usuário

    id: int, representa o identificador do usuário
    username: varchar(15), representa o username do usuário no sistema
    password: varchar, representa a hash da senha do usuário
    img: img, representa a imagem do usuário

    """
    
    img = models.ImageField(upload_to=uploadImg)

    def __str__(self):
        return f"{self.username}"


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    show = models.ForeignKey(Show, on_delete=models.CASCADE)
    fav_riders = models.ManyToManyField(Rider, related_name="fav_shows")
    show_review = models.CharField(max_length=250, blank=True, null=False)
    
    def clean(self):
        super().clean()
        
        # Esta validação só funciona se a instância já foi salva
        if self.pk:
            invalid_riders = []
            for rider in self.fav_riders.all():
                if rider.tv_show != self.show:
                    invalid_riders.append(rider.name)
            
            if invalid_riders:
                raise ValidationError({
                    'fav_riders': f"Os seguintes riders não pertencem à série '{self.show.name}': {', '.join(invalid_riders)}"
                })


class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(blank=False, null=False)
    date = models.DateField(blank=False, null=False)
    img = models.ImageField(
        upload_to=uploadImg, height_field=None, width_field=None, max_length=None
    )
    tagged_riders = models.ManyToManyField(
        Rider, related_name="posts"
    )  # com o related name, também posso usar rider.posts.all() do lado do rider


class Comment(models.Model):
    content = models.CharField(blank=False, null=False)
    date = models.DateField(blank=False, null=False)
    author = models.ForeignKey(User, related_name="comments", on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
