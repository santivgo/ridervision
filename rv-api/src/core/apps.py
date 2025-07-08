from django.apps import AppConfig


class CoreConfig(AppConfig):
    name = "core"

    def ready(self):
        from core.tasks import create_daily_post

        create_daily_post.delay()
