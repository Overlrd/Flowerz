from django.shortcuts import render
from django import forms
from django.core.validators import FileExtensionValidator
from PIL import Image
import tensorflow as tf
from tensorflow import keras
import tensorflow_hub as hub
import numpy as np 
import pickle
import os

from .models import Image
from .magi.utils import MlModel
from Flowerz.settings import MODEL_CONFIG_PATH , MODEL_WEIGHTS_PATH , MEDIA_ROOT
from .forms import ImageForm

# instanciate the model
custom_objects={'KerasLayer': hub.KerasLayer}
Model_Instance = MlModel(MODEL_CONFIG_PATH, MODEL_WEIGHTS_PATH, custom_objects)

# index view
def index(request):
    """Process images uploaded by users"""
    if request.method == 'POST':
        form = ImageForm(request.POST, request.FILES)
        if form.is_valid():
            images = request.FILES.getlist("images")
            img_obj = []
            for img in images:
                image = Image()
                image.image = img 
                image.save()
                img_obj.append(image)

            img_paths = [os.path.join(MEDIA_ROOT, img.image.name) for img in img_obj]
            values , classes = Model_Instance.predict_batch(img_paths)
            return render(request, 'predict/index.html', {'form': form, 'img_obj': img_obj,
                                                          "predictions":[values,classes]})
    else:
        form = ImageForm()
    return render(request, 'predict/index.html', {'form': form})
