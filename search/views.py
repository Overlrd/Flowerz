import json

from django.shortcuts import render
from django.http import HttpResponse
from trefleapi import Client
from Flowerz.settings import TREFFLE_API_KEY
from Flowerz.utils.wikipedia_utils import WikiInfoExtractor

Extractor = WikiInfoExtractor()
Tclient = Client(TREFFLE_API_KEY)

async def index(request):
    if request.method == "GET":
        response = json.dumps(Tclient.list("species").get_json())
        return HttpResponse(response, content_type="application/json")

def search(request, q):
    if request.method == "GET":
        response = json.dumps(Tclient.search(q).in_("plants").get_json())
        return HttpResponse(response, content_type="application/json")