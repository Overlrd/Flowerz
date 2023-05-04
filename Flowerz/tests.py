from unittest.mock import patch, MagicMock
from django.test import TestCase
from Flowerz.utils.treffle_wrapper.treffle import TreffleAPIWrapper, Query
from Flowerz.settings import TREFFLE_API_KEY


class TreffleAPIWrapperTestCase(TestCase):
    def setUp(self):
        self.token = TREFFLE_API_KEY
        self.API = TreffleAPIWrapper(self.token)

    @patch('Flowerz.utils.treffle_wrapper.treffle.TreffleAPIWrapper.make_request')
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
        request = self.API.search_plants(query=query).filter_(**filters).build()
        result = self.API.make_request(*request)
        self.assertEqual(result["data"][0]["common_name"], "Passion flower")

    @patch('Flowerz.utils.treffle_wrapper.treffle.TreffleAPIWrapper.make_request')
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
        request = self.API.search_plants(query, limit=3).build()
        result = self.API.make_request(*request)
        self.assertEqual(len(result["data"]), 3)
