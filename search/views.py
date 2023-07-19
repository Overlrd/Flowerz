import json

from django.shortcuts import render
from django.http import HttpResponse
from trefleapi import Client
from Flowerz.settings import TREFFLE_API_KEY

Tclient = Client(TREFFLE_API_KEY)

def index(request):
    if request.method == "GET":
        response = Tclient.list("species").get_json()
        print(len(response), len(response["data"]))
        response = json.dumps(response)
        return HttpResponse(response, content_type="application/json")
