# Generated by Django 2.2 on 2020-12-04 08:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_manager'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='slug',
            field=models.SlugField(blank=True, null=True),
        ),
    ]
