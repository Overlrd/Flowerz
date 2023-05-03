from django.test import TestCase
from Flowerz.utils.treffle_wrapper.treffle import TreffleAPIWrapper

class TreffleAPIWrapperTestCase(TestCase):
    def setUp(self):
        self.token = "fb7c8Funa_gZnYU5onH0Oj79uapv-vvUMZ9tDqU0JTo"
        self.wrapper = TreffleAPIWrapper(self.token)

    def test_search_species(self):
        query = "passion flower"
        # scientific name , common_name value is case sensitive
        filters = {"scientific_name":"pclassiflora mixta"}
        result = self.wrapper.search_species(query, filters=filters)
        print(result)
        print()
        self.assertEqual(result["data"][0]["common_name"], "Passion flower")


    def test_search_plants(self):
        query = "passion flower"
        result = self.wrapper.search_plants(query, limit=3)
        print(result)
        print()
        self.assertEqual(len(result["data"]), 3)

"""     def test_search_species(self):
        query = "Abies alba"
        filters = {"common_name": "Grecian fir", "synonyms":"Pinus apollinis"}
        result = self.wrapper.search_species(query, filters=filters)
        self.assertEqual(result["data"][0]["common_name"], "Grecian fir")

    def test_search_plants(self):
        query = "abies-cephalonica"
        filters = {"family_common_name": "Pine family"}
        result = self.wrapper.search_plants(query, filters=filters)
        self.assertEqual(result["data"][0]["common_name"], "Grecian fir")
 """