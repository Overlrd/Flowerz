# Generated by Django 4.2 on 2023-07-27 09:14

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('predict', '0005_alter_image_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='title',
            field=models.CharField(default=uuid.UUID('fa2ced4e-2c5d-11ee-8175-a44e313181c0'), max_length=100),
        ),
    ]
