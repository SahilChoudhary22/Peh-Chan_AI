# Generated by Django 2.2 on 2020-04-30 16:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0002_image_probability'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='probability',
            field=models.FloatField(blank=True, max_length=50),
        ),
    ]