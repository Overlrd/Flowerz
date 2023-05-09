import json

from django.core.cache import cache
import requests


class WikimediaAPIWrapper:
    def __init__(self, client_id , client_secret):
        self.__client_id = client_id
        self.__client_secret = client_secret

         