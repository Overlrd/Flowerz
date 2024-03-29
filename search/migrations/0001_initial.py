# Generated by Django 4.2 on 2023-07-25 13:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SearchLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('search', models.BooleanField()),
                ('search_query', models.CharField(blank=True, max_length=255, null=True)),
                ('api_response_time', models.FloatField()),
            ],
        ),
    ]
