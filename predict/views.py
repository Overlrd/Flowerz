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
from .utils.model_utils import (get_model , get_labels , custom_predict ,
                                process_image , post_process , labels ,
                                  custom_objects)
from .utils.search_utils import infos , TreffeClient
from Flowerz.settings import MODEL_CONFIG_PATH , MODEL_WEIGHTS_PATH , MEDIA_ROOT , MEDIA_URL , TREFFLE_API_KEY
from Flowerz.utils.TreffleWrapper import TreffleAPIWrapper , Query , extract_data , TREFFLE_DATA_FIELDS
from .forms import ImageForm , process_image_form


def get_flower_infos(request ,name , wiki_only = None):
        if wiki_only :
            wiki_infos = {}
            wiki = MyTreffleClient.search_info_wikipedia(title_=name)
            wiki_infos['summary'] = wiki[0]
            wiki_infos['link'] = wiki[1]
            response_data = json.dumps(wiki_infos)
            print("returning wiki data")
            return HttpResponse(response_data, content_type='application/json')

        TreffleAPI = TreffleAPIWrapper(TREFFLE_API_KEY) 
        request_ = TreffleAPI.SearchPlantsQuery(query=name,limit=1)    
        data =  TreffleAPI.make_request(request_)

        flower_infos = TreffleAPI.extract_data(data, TREFFLE_DATA_FIELDS)
        response_data = json.dumps(flower_infos)

        return HttpResponse(response_data, content_type='application/json')
    

# index view
def index(request):
    """Process images uploaded by users"""
    form = ImageForm(request.POST, request.FILES) if request.method == "POST" else  ImageForm()
    if form.is_valid():
        img_paths, img_obj = process_image_form(request)

        # build, process and predict
        model = get_model(MODEL_CONFIG_PATH, MODEL_WEIGHTS_PATH, custom_objects)
        image_data = process_image(img_paths=img_paths, img_res=224)
        prediction_dict = custom_predict(model, image_data, labels,3)

        flower_better_name =  list(prediction_dict.keys())[0].split('-')[-1]

        data = {
            "img_urls" : [f"{MEDIA_URL}{img.image.name}" for img in img_obj],
            "prediction" : prediction_dict ,
            "first_class_infos" : get_flower_infos(request ,name = flower_better_name.content.decode('utf-8'))
        }
        response_data = json.dumps(data)
        return HttpResponse(response_data, content_type="application/json")
            
    else:
        form = ImageForm()
        return render(request, 'predict/index.html', {'form': form})

