from django.db import models
from core.models.user import User
from core.models.rider import Rider



class Post(models.Model):
    id = models.AutoField(primary_key=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(blank=False, null=False)
    img = models.ImageField(upload_to=f"media/users/{id}", height_field=None, width_field=None, max_length=None)
    riders = models.ManyToManyField(Rider, through='Tag', related_name='posts') # use a minha própria tabela Tag para controlar isso.” com o related post, também posso usar rider.posts.all() do lado do rider


class Tag(models.Model):
    id = models.AutoField(primary_key=True)
    rider = models.ForeignKey(Rider, on_delete=models.PROTECT)
    post = models.ForeignKey(Post, on_delete=models.PROTECT)
