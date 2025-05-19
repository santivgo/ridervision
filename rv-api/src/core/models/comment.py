from django.db import models
from core.models.user import User
from core.models.show import Show

class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.CharField(blank=False, null=False)
    date = models.DateField(blank=False, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    show = models.ManyToManyField(Show)
