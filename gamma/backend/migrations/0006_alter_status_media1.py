# Generated by Django 5.0 on 2024-01-20 06:18

import backend.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0005_status_media1'),
    ]

    operations = [
        migrations.AlterField(
            model_name='status',
            name='media1',
            field=models.ImageField(blank=True, default=None, null=True, upload_to=backend.models.upload_to),
        ),
    ]
