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
from Flowerz.utils.wikipedia_utils import (get_page_image, get_page_text, get_infobox_data,
                                           get_all_data)
from .forms import ImageForm, process_image_form
from .utils.model_utils import (
    get_model,
    custom_predict,
    process_image,
    labels,
    custom_objects
)

ModelInstance = get_model(MODEL_CONFIG_PATH, MODEL_WEIGHTS_PATH,
                          custom_objects)


def generate_response_data(**kwargs):
    data = {}
    for key, value in kwargs.items():
        data[key] = value
    return json.dumps(data)


# index view
def index(request):
    """Process images uploaded by users"""
    print("Handling new request")
    print("Request post  :", request.POST)
    print("Request files  :", request.FILES)
    form = ImageForm(request.POST, request.FILES) if request.method == "POST" else ImageForm()
    if form.is_valid():
        img_paths, img_obj = process_image_form(request)
        print("form is valid")
        # build, process and predict

        image_data = process_image(img_paths=img_paths, img_res=224)
        prediction_dict = custom_predict(ModelInstance, image_data, labels, 3)

        first_class_name = list(prediction_dict.keys())[0]  # .split('-')[-1]

        response_data = generate_response_data(img_urls=[
            f"{MEDIA_URL}{img.image.name}"for img in img_obj],
            prediction=prediction_dict,
            first_class_name=first_class_name)
        print(response_data)
        return HttpResponse(response_data, content_type="application/json")
    else:
        print('form is not valid ')
        form = ImageForm()
        return render(request, 'index.html', {'form': form})


async def get_flower(request, name, to_return):
    """Retrieve information for a flower from wikipedia with the flower name"""
    if request.method == "GET":
        if to_return == "description":
            description = await get_page_text(name, "== ")
            response_data = generate_response_data(name=name, description=description)
            return HttpResponse(response_data, content_type="application/json")
        elif to_return == "image":
            thumbnail_url = await get_page_image(name, 500)
            response_data = generate_response_data(name=name, thumbnail_url=thumbnail_url)
            return HttpResponse(response_data, content_type="application/json")
        elif to_return == "infobox":
            infobox_biota = await get_infobox_data(name)
            response_data = generate_response_data(name=name, infobox_biota=infobox_biota)
            return HttpResponse(response_data, content_type='application/json')
        elif to_return in ["*", "all"]:
            all_data = await get_all_data(page_title=name, split="== ", thumb_size=500)
            response_data = generate_response_data(name=name, data=all_data)
            return HttpResponse(response_data, content_type="application/json")
