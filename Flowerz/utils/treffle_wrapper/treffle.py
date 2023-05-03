import os
import requests

class TreffleAPIWrapper:
    def __init__(self, token):
        self.base_url = "https://trefle.io/api/v1"
        self.token = token

    def search_plants(self, query , page=1 , filters=None , limit = None):
        url = f"{self.base_url}/plants/search"
        params = {"q": query, "page": page }
        if limit:
            params["limit"] = limit
        headers = {"Authorization": f"Bearer {self.token}"}
        if filters:
            for key, value in filters.items():
                params[f"filter[{key}]"] = value
        response = requests.get(url, params=params, headers=headers)
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Failed to search plant: {response.text}")
    
    def search_species(self, query , page=1 , filters=None , limit = None):
        url = f"{self.base_url}/plants/search"
        params = {"q": query, "page": page }
        if limit:
            params["limit"] = limit
        headers = {"Authorization": f"Bearer {self.token}"}
        if filters:
            for key, value in filters.items():
                params[f"filter[{key}]"] = value
        response = requests.get(url, params=params, headers=headers)
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Failed to search specy: {response.text}")
    
if __name__ == "__main__":
    api = TreffleAPIWrapper("fb7c8Funa_gZnYU5onH0Oj79uapv-vvUMZ9tDqU0JTo")
    results = api.search_plants("rose")
    print(results)