from django.shortcuts import render

from .utils.token_utils import check_token, renew_client_side_token
from Flowerz.settings import TREFFLE_API_KEY
from Flowerz.utils.treffle_wrapper import TrefleAPIWrapper


def index(request, query, limit, order, filter_):
    if request.method == 'GET':
        client_token = check_token(request=request)
        if not client_token:
            client_token = renew_client_side_token(TREFFLE_API_KEY)

        API = TrefleAPIWrapper(client_token)
        trefle_response = API.make_request(API.SearchPlantsQuery(query=query,
                                                                 limit=limit))
        extracted_data = API.extract_data(trefle_response['data']["id", "common_name", "scientific_name", "image_url"])
        return render(request, 'search/index.html', {'extracted_data': extracted_data})
