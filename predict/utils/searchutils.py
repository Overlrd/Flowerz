import wikipedia
import wikipediaapi 
import requests
import json
from time import time
TOKEN = "fb7c8Funa_gZnYU5onH0Oj79uapv-vvUMZ9tDqU0JTo"
API = "https://trefle.io/api/v1/plants/search"
infos = ['id','common_name','scientific_name','year','bibliography', 'author','family_common_name','image_url' , 'synonyms','genus','family']

class Flower:
    def __init__(self, **kwargs):
        self.id = kwargs.get('id')
        self.name = kwargs.get('name')
        self.common_name = kwargs.get('common_name')
        self.scientific_name = kwargs.get('scientific_name')
        self.year = kwargs.get('year')
        self.bibliography = kwargs.get('bibliography')
        self.author = kwargs.get('author')
        self.family_common_name = kwargs.get('family_common_name')
        self.genus_id = kwargs.get('genus_id')
        self.image_url = kwargs.get('image_url')
        self.synonyms = kwargs.get('synonyms')
        self.genus = kwargs.get('genus')
        self.family = kwargs.get('family')
        self.wiki_description , self.wiki_url  = self.search_info_wikipedia()
    def search_info_wikipedia(self ,lenght=5):
        t = time()
        wiki_api = wikipediaapi.Wikipedia(language='en')
        page = wiki_api.page(self.scientific_name)
        if page.exists() :
            print("returning after wiki search ", time() - t)
            return wikipedia.summary(self.scientific_name, sentences = lenght) , wikipedia.page(self.scientific_name).url
    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)


class TreffeClient:
    def __init__(self, token , api_url , limit=1):
        self.token = token
        self.api_url = api_url 
        self.limit = limit

    def search_item(self, q , to_retrieve):
        self.q = q
        t = time()
        payload = {'token':self.token,'q':q,'limit':self.limit}
        r = requests.get(self.api_url, params= payload)
        r = r.json()
        data = r['data'][0]
        self.flower_dict = {i : data[i] for i in to_retrieve}
        print("returning after treffle search ", time() - t)
        return self.flower_dict
    def search_info_wikipedia(self, title_=None, length=10):
        if not title_:
            title = self.flower_dict['scientific_name']
        else:
            title = title_
            
        t = time()
        wiki_api = wikipediaapi.Wikipedia(language='en')
        page = wiki_api.page(title)
        if page.exists() :
            print("returning after wiki search ", time() - t)
            return wikipedia.summary(title, sentences=length), wikipedia.page(title).url
