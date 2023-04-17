from django.core.validators import FileExtensionValidator
from django import forms
from .models import Image


class ImageForm(forms.ModelForm):
    """Form for the image model"""
    images = forms.FileField(widget=forms.ClearableFileInput(attrs={'multiple': True}), validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])])

    class Meta:
        model = Image
        fields = ('images',) 