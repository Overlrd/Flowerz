import json

from django.test import TestCase
import requests
from unittest.mock import patch, MagicMock 

from Flowerz.utils.treffle_wrapper import TreffleAPIWrapper, Query
from Flowerz.utils.wikipedia_utils import WikimediaAPIWrapper
from Flowerz.settings import TREFFLE_API_KEY , WIKIMEDIA_CLIENT_ID , WIKIMEDIA_CLIENT_SECRET

class TreffleAPIWrapperTestCase(TestCase):
    def setUp(self):
        self.token = TREFFLE_API_KEY
        self.API = TreffleAPIWrapper(self.token)

    @patch('Flowerz.utils.TreffleWrapper.TreffleAPIWrapper.make_request')
    def test_search_species(self, mock_make_request):
        # Mock the response of the API
        mock_make_request.return_value = {
            "data": [{
                "common_name": "Passion flower",
                "scientific_name": "Passiflora mixta"
            }]
        }

        query = "passion flower"
        filters = {"scientific_name": "Passiflora mixta"}
        request = self.API.SearchPlantsQuery(query=query).filter_(**filters)
        result = self.API.make_request(request)
        self.assertEqual(result["data"][0]["common_name"], "Passion flower")

    @patch('Flowerz.utils.TreffleWrapper.TreffleAPIWrapper.make_request')
    def test_search_plants(self, mock_make_request):
        # Mock the response of the API
        mock_make_request.return_value = {
            "data": [
                {"common_name": "Plant 1"},
                {"common_name": "Plant 2"},
                {"common_name": "Plant 3"}
            ]
        }

        query = "passion flower"
        request = self.API.SearchPlantsQuery(query, limit=3)
        result = self.API.make_request(request)
        self.assertEqual(len(result["data"]), 3)

class WikimediaAPIWrapperCase(TestCase):
    def setUp(self):
        self.client_id = WIKIMEDIA_CLIENT_ID
        self.client_secret = WIKIMEDIA_CLIENT_SECRET
        self.app_name = "My Test App"
        self.contact_infos = "checkmehere@mail;com"
        self.to_extract = ["title","description","article_url","thumbnail_url"]
        self.API = WikimediaAPIWrapper(self.client_id, self.client_secret,
                                       self.app_name, self.contact_infos)
        
    @patch('Flowerz.utils.WikimediaWrapper.WikimediaAPIWrapper._get_access_token')
    def test_search_wikipedia(self, mock__get_access_token):
        # Mock the access tokens
        mock__get_access_token.return_value = ("bbbbbb866a70115aaa",None)

        # Mock the request response
        response = {
        "pages":[
            {   "title":"Slim Shady",
                "description":"a brain dead guy",
                "key":"slim_shady",
                "thumbnail":{"foo":"baz", "url":"https://thumbnail_url_slim_shady.jpeg"}}
        ]}
        response_json = json.dumps(response)
        response_mock = requests.Response()
        response_mock._content = response_json.encode()

        with patch('requests.get', return_value=response_mock):
            extracted_data = self.API.search_wikipedia("slim shady",self.to_extract)
            for key in self.to_extract:
                assert key in extracted_data



    















