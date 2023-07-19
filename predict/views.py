"""
Flowerz -> predict
Use transfer learning and image augmentation to predict a flower's common
known species name by using a Tensorflow ImageNetV2 model trained on Oxford
Flower102 Dataset from the Tensorflow Dataset API
"""

import json

from django.http import HttpResponse
from django.shortcuts import render

from Flowerz.settings import MODEL_CONFIG_PATH, MODEL_WEIGHTS_PATH, MEDIA_URL
from Flowerz.utils.wikipedia_utils import WikiInfoExtractor
from .forms import ImageForm, process_image_form
from .utils.util import generate_response_data
from .utils.model_utils import (
    get_model,
    custom_predict,
    process_image,
    labels,
    custom_objects
)

Model = get_model(MODEL_CONFIG_PATH, MODEL_WEIGHTS_PATH, custom_objects)
Extractor = WikiInfoExtractor()

# index view
def index(request):
    """Process images uploaded by users"""
    form = ImageForm(request.POST, request.FILES) if request.method == "POST" else ImageForm()
    if form.is_valid():
        img_paths, img_obj = process_image_form(request)

        # build, process and predict

        image_data = process_image(img_paths=img_paths, img_res=224)
        prediction_dict = custom_predict(Model, image_data, labels, 3)
        first_class_name = list(prediction_dict.keys())[0]

        response_data = generate_response_data(img_urls=[
            f"{MEDIA_URL}{img.image.name}"for img in img_obj],
            prediction=prediction_dict,
            first_class_name=first_class_name)
        print(response_data)
        return HttpResponse(response_data, content_type="application/json")
    else:
        form = ImageForm()
        return render(request, 'index.html', {'form': form})


async def get_flower(request, name, to_return):
    """Retrieve information for a flower from wikipedia with the flower name"""
    if request.method == "GET":
        response_data = None

        wiki_data = await Extractor.extract(to_extract=to_return, page_title=name)
        response_data = generate_response_data(name=name, data=wiki_data)
        return HttpResponse(response_data, content_type="application/json")
