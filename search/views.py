from django.shortcuts import render
from .utils.ClientSideToken import get_token
from Flowerz.settings import TREFFLE_API_KEY
def index(request):
    print(TREFFLE_API_KEY)
    client_token = get_token(token=TREFFLE_API_KEY)
    return render(request, 'search/index.html', {'hi': 'hello', 'client_token':client_token})
