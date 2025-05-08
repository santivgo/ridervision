from django.db import models


class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=15,unique=True, null=False, blank=False)
    password = models.CharField(null=False, blank=False)
    img = models.ImageField(upload_to="media/rider")
