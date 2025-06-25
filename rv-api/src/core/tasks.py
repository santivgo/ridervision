from celery import shared_task
from datetime import date
import random
from django.db import transaction
from core.models import Post, Rider

@shared_task
def create_daily_post():
    """
    Cria o post do dia para o usuário id=1 com um Rider aleatório.
    """
    today = date.today()
    user_id = 1
    if Post.objects.filter(author_id=user_id, date=today).exists():
        return 'Post de hoje já existe.'
    all_riders = list(Rider.objects.all())

    rider = random.choice(all_riders)
    with transaction.atomic():
        post = Post.objects.create(
            author_id=user_id,
            content='',
            date=today,
            img=''
        )
        post.tagged_riders.add(rider)
    return f'Post de hoje gerado.'
