from django.core.cache import cache
from django.shortcuts import render

from .utils.TokenActions import get_client_jwt
from Flowerz.settings import TREFFLE_API_KEY
from Flowerz.utils.TreffleWrapper import TreffleAPIWrapper, Query , extract_data
from Flowerz.utils.WikimediaWrapper import WikimediaAPIWrapper , CustomHTMLParser

TO_EXTRACT = []

def index(request):

    client_token = get_client_jwt(request=request, TOKEN=TREFFLE_API_KEY)
    API = TreffleAPIWrapper(client_token)
    treffle_response = API.make_request(API.SearchPlantsQuery(query="Passion flower", limit=3))
    extracted_data = API.extract_data(treffle_response['data'], ["id","common_name","scientific_name", "image_url"])
    
    return render(request, 'search/index.html', {'extracted_data': extracted_data})

