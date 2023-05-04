import wikipedia
import wikipediaapi 
import requests
import json
from time import time
from Flowerz.settings import TREFFLE_API_KEY
TOKEN = TREFFLE_API_KEY
API = "https://trefle.io/api/v1/plants/search"
infos = ['id','common_name','scientific_name','year','bibliography', 'author','family_common_name','image_url' , 'synonyms','genus','family']

class TreffeClient:
    def __init__(self, token , api_url , limit=1):
        self.__token = token
        self.api_url = api_url 
        self.limit = limit
    def search_item(self, q , to_retrieve):
        self.q = q
        payload = {'token':self.__token,'q':q,'limit':self.limit}
        r = requests.get(self.api_url, params= payload)
        r = r.json()
        data = r['data'][0]
        self.flower_dict = {i : data[i] for i in to_retrieve}
        return self.flower_dict
    def search_info_wikipedia(self, title_=None, length=10):
        title = title_ if title_ else self.flower_dict['scientific_name']        
        wiki_api = wikipediaapi.Wikipedia(language='en')
        page = wiki_api.page(title)
        if page.exists() :
            return wikipedia.summary(title, sentences=length), wikipedia.page(title).url
