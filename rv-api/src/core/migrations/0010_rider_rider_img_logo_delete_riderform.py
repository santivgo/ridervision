# Generated by Django 5.2.1 on 2025-05-26 22:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_alter_post_img'),
    ]

    operations = [
        migrations.AddField(
            model_name='rider',
            name='rider_img_logo',
            field=models.ImageField(default=1, upload_to='media/riders/logos'),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='RiderForm',
        ),
    ]
