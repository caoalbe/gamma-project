# Generated by Django 5.0 on 2024-01-30 00:15

import backend.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_alter_status_media1'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='pfp',
            field=models.ImageField(blank=True, default=None, null=True, upload_to=backend.models.upload_to),
        ),
    ]
