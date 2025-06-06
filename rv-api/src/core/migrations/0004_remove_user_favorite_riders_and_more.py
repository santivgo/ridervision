# Generated by Django 5.2.1 on 2025-06-01 17:18

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0003_alter_rider_name_alter_show_show_img_banner_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="user",
            name="favorite_riders",
        ),
        migrations.RemoveField(
            model_name="user",
            name="favorite_shows",
        ),
        migrations.CreateModel(
            name="Review",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("show_review", models.CharField(blank=True, max_length=200)),
                (
                    "fav_riders",
                    models.ManyToManyField(related_name="fav_shows", to="core.rider"),
                ),
                (
                    "show",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="core.show"
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="core.user"
                    ),
                ),
            ],
        ),
        migrations.DeleteModel(
            name="FavoriteShow",
        ),
    ]
