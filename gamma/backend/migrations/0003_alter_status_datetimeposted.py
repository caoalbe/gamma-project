# Generated by Django 5.0 on 2024-01-18 04:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_status_datetimeposted'),
    ]

    operations = [
        migrations.AlterField(
            model_name='status',
            name='dateTimePosted',
            field=models.DateTimeField(),
        ),
    ]
