# Generated by Django 5.0 on 2024-01-30 02:09

import backend.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0007_user_pfp'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='banner',
            field=models.ImageField(blank=True, default=None, null=True, upload_to=backend.models.upload_to),
        ),
    ]
