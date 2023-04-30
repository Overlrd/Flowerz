from django.shortcuts import render
from .utils.TokenActions import get_token

def index(request):
    client_token = get_token()
    return render(request, 'search/index.html', {'hi': 'hello', 'client_token':client_token})
