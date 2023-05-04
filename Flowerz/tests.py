from django.test import TestCase
from Flowerz.utils.treffle_wrapper.treffle import TreffleAPIWrapper , Query
from Flowerz.settings import TREFFLE_API_KEY
class TreffleAPIWrapperTestCase(TestCase):
    def setUp(self):
        self.token = TREFFLE_API_KEY
        self.API = TreffleAPIWrapper(self.token)

    def test_search_species(self):
        query = "passion flower"
        filters = {"scientific_name":"Passiflora mixta"}
        request = self.API.search_plants(query=query).filter_(**filters).build()
        print(request)
        result = self.API.make_request(*request)
        self.assertEqual(result["data"][0]["common_name"], "Passion flower")


    def test_search_plants(self):
        query = "passion flower"
        request = self.API.search_plants(query, limit=3).build()
        print(request)
        result = self.API.make_request(*request)
        self.assertEqual(len(result["data"]), 3)