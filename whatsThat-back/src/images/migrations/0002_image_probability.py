# Generated by Django 2.2 on 2020-04-30 16:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='image',
            name='probability',
            field=models.FloatField(default=100, max_length=50),
            preserve_default=False,
        ),
    ]
