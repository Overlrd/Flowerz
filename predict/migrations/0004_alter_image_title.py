# Generated by Django 4.2 on 2023-07-25 16:19

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('predict', '0003_mllog_alter_image_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='title',
            field=models.CharField(default=uuid.UUID('0de49be6-2b07-11ee-bea2-39bb283fefc9'), max_length=100),
        ),
    ]
