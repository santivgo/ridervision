from django.db import models

from rv.core.models.rider import Rider
from rv.core.models.user import User


class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.CharField()
    date = models.DateField()
    user = models.ForeignKey(User, on_delete=models.RESTRICT)
    rider = models.ManyToManyField(Rider)
