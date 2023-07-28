import json
import time
from .models import SearchLog
from django.shortcuts import render
from django.http import HttpResponse
from trefleapi import Client
from Flowerz.settings import TREFLE_API_KEY
from Flowerz.utils.wikipedia_utils import WikiInfoExtractor

Extractor = WikiInfoExtractor()
Tclient = Client(TREFLE_API_KEY)

def index(request):
    if request.method == "GET":
        t0 = time.time()
        response = Tclient.list("species").get_json()
        t1 = time.time()
        response = json.dumps(response)

        search_log = SearchLog(
            search=False,
            api_response_time=t1 - t0
        )
        search_log.save()

        return HttpResponse(response, content_type="application/json")

def search(request, q):
    if request.method == "GET":
        t0 = time.time()
        response = Tclient.search(q).in_("plants").get_json()
        t1 = time.time()
        response = json.dumps(response)
        search_log = SearchLog(
            search=True,
            search_query=q,
            api_response_time=t1 - t0
        )
        search_log.save()
        return HttpResponse(response, content_type="application/json")