import uuid

from django.db import models

# Create your models here.


class Image(models.Model):
    title = models.CharField(max_length=100, default=uuid.uuid1())
    image = models.ImageField(upload_to='images')

    def __str__(self):
        return self.title


class MLLog(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    images_path = models.JSONField()
    predictions = models.JSONField()
    processing_time = models.FloatField()
    prediction_time = models.FloatField()

    def __str__(self):
        return f"ML Model Log - {self.date}"