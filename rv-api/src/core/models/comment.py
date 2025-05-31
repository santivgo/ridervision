from django.db import models
from core.models.user import User
from core.models.post import Post

class Comment(models.Model):
    content = models.CharField(blank=False, null=False)
    date = models.DateField(blank=False, null=False)
    author = models.ForeignKey(User, related_name="comments", on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
