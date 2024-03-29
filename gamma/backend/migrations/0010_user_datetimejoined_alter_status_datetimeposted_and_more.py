# Generated by Django 5.0 on 2024-02-01 01:29

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0009_user_password'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='dateTimeJoined',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='status',
            name='dateTimePosted',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.CreateModel(
            name='Following',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('end', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='end', to='backend.user')),
                ('start', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='start', to='backend.user')),
            ],
        ),
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('statusID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.status')),
                ('viewer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.user')),
            ],
        ),
    ]
