from django.shortcuts import render
from .utils.TokenActions import get_client_jwt
from Flowerz.settings import TREFFLE_API_KEY
from Flowerz.utils.TreffleWrapper import TreffleAPIWrapper, Query

TO_EXTRACT = []

def index(request):
    client_token = get_client_jwt(request=request, TOKEN=TREFFLE_API_KEY)
    API = TreffleAPIWrapper(client_token)
    response = API.make_request(API.SearchPlantsQuery(query="Passion flower", limit=3))
    extracted_data = extract_data(response['data'], ["id","common_name","scientific_name", "image_url"])
    return render(request, 'search/index.html', {'extracted_data': extracted_data})

def extract_data(data, to_extract):
    extracted = []
    for flower in data:
        extracted_flower = {}
        for key in to_extract:
            if key in flower:
                extracted_flower[key] = flower[key]
        extracted.append(extracted_flower)
    return extracted
