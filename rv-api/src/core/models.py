
from core.utils.upload_img import upload_img
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Show(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=False, null=False, unique=True)
    year = models.IntegerField(validators=[MinValueValidator(1800)])
    synopsis = models.CharField(blank=True, null=False)
    show_img_xl = models.ImageField(upload_to=upload_img) # poster
    show_img_sm = models.ImageField(upload_to=upload_img) # icons
    show_img_banner = models.ImageField(upload_to=upload_img) # banners
    show_img_logo = models.ImageField(upload_to=upload_img) # logo

    # show_img_xl = models.CharField(max_length=100) # poster
    # show_img_sm = models.CharField(max_length=100) # icons
    # show_img_banner = models.CharField(max_length=100) # banners
    # show_img_logo = models.CharField(max_length=100) # logo
    

class Rider(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=False, null=False)
    main_user = models.CharField(max_length=50, blank=False, null=False)
    rider_img_body = models.ImageField(upload_to=upload_img) # full body rider image
    rider_img_sm = models.ImageField(upload_to=upload_img) # cards
    # rider_img_body = models.CharField() # full body rider image
    # rider_img_sm = models.CharField() # cards
    tv_show = models.ForeignKey(Show, on_delete=models.PROTECT)
    
    def __str__(self):
        return f"{self.name}"



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
    username = models.CharField(max_length=15, unique=True, null=False, blank=False)
    password = models.CharField(null=False, blank=False)
    img = models.ImageField(upload_to=upload_img)


    def __str__(self):
        return f"{self.username}"

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    show = models.ForeignKey(Show, on_delete=models.CASCADE)
    fav_riders = models.ManyToManyField(Rider, related_name="fav_shows")
    show_review = models.CharField(max_length=200, blank=True, null=False)

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(blank=False, null=False)
    date = models.DateField(blank=False, null=False)
    img = models.ImageField(upload_to=upload_img, height_field=None, width_field=None, max_length=None)
    tagged_riders = models.ManyToManyField(Rider, related_name='posts') # com o related name, também posso usar rider.posts.all() do lado do rider

class Comment(models.Model):
    content = models.CharField(blank=False, null=False)
    date = models.DateField(blank=False, null=False)
    author = models.ForeignKey(User, related_name="comments", on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
