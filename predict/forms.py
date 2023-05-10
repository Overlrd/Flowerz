import os 
from django.core.validators import FileExtensionValidator
from django import forms
from .models import Image
from Flowerz.settings import MEDIA_ROOT , MEDIA_URL


class ImageForm(forms.ModelForm):
    """Form for the image model"""
    images = forms.FileField(widget=forms.ClearableFileInput(attrs={'multiple': True}), validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])])

    class Meta:
        model = Image
        fields = ('images',) 

def process_image_form(request):
    """Process and return a list of images paths and a list of image.objects """
    images = request.FILES.getlist("images")
    if images :
        img_obj = []
        img_obj = [Image.objects.create(image=img) for img in images]
        img_paths = [os.path.join(MEDIA_ROOT, img.image.name) for img in img_obj]
        return img_paths , img_obj