from django.shortcuts import render
from django.http import HttpResponse
from django import forms
from django.core.validators import FileExtensionValidator
from PIL import Image
import tensorflow as tf
from tensorflow import keras
import tensorflow_hub as hub
import numpy as np 
import pickle
import os
import wikipediaapi
import wikipedia
import json
from time import time 
from decimal import Decimal as D

from .models import Image
from .utils.modelutils import (get_model , get_labels , custom_predict ,
                                process_image , post_process , labels ,
                                  custom_objects)
from .utils.searchutils import TreffeClient , TOKEN , API , infos 
from Flowerz.settings import MODEL_CONFIG_PATH , MODEL_WEIGHTS_PATH , MEDIA_ROOT , MEDIA_URL
from .forms import ImageForm

# instanciate the model
model = get_model(MODEL_CONFIG_PATH, MODEL_WEIGHTS_PATH, custom_objects)

MyTreffleClient = TreffeClient(token=TOKEN , api_url=API , limit=1)

def get_flower_object(request ,name , wiki_only = None):
    if not wiki_only :
        classinfos = MyTreffleClient.search_item(q=name, to_retrieve=infos)
        classinfos['name'] = name
        response_data = json.dumps(classinfos)
        print("returning treffle data")
        return HttpResponse(response_data, content_type='application/json')
    elif wiki_only :
        wiki_infos = {}
        wiki = MyTreffleClient.search_info_wikipedia(title_=name)
        wiki_infos['summary'] = wiki[0]
        wiki_infos['link'] = wiki[1]
        response_data = json.dumps(wiki_infos)
        print("returning wiki data")
        return HttpResponse(response_data, content_type='application/json')

# index view
def index(request):
    """Process images uploaded by users"""
    form = ImageForm(request.POST, request.FILES) if request.method == "POST" else  ImageForm()
    if form.is_valid():
        images = request.FILES.getlist("images")
        img_obj = []
        img_obj = [Image.objects.create(image=img) for img in images]
        img_paths = [os.path.join(MEDIA_ROOT, img.image.name) for img in img_obj]
        # process and predict
        image_data = process_image(img_paths=img_paths, img_res=224)
        prediction_dict = custom_predict(model, image_data, labels,3)

        data = {
            "img_urls" : [f"{MEDIA_URL}{img.image.name}" for img in img_obj],
            "prediction" : prediction_dict ,
            "first_class_infos" : get_flower_object(request ,name = list(prediction_dict.keys())[0]).content.decode('utf-8')
        }
        response_data = json.dumps(data)
        return HttpResponse(response_data, content_type="application/json")
            
    else:
        form = ImageForm()
        return render(request, 'predict/index.html', {'form': form})

