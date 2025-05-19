from django.db import models
from core.models.user import User
from core.models.rider import Rider



class Post(models.Model):
    id = models.AutoField(primary_key=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(blank=False, null=False)
    date = models.DateField(blank=False, null=False)
    img = models.ImageField(upload_to=f"media/users/{id}", height_field=None, width_field=None, max_length=None)
    tagged_riders = models.ManyToManyField(Rider, related_name='posts') # com o related name, também posso usar rider.posts.all() do lado do rider


