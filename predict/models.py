from django.db import models
import uuid
# Create your models here.
class Image(models.Model):
    title = models.CharField(max_length=100, default=uuid.uuid1())
    image = models.ImageField(upload_to='images')

    def __str__(self):
        return self.title