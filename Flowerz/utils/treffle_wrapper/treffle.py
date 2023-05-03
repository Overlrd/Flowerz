import os
import requests

class Query:
    def __init__(self, query , page = 1 , limit = 3 , **kwargs):
        self.filters = {}
        self.orderers = {}
        self.q = query
        self.page = page 
        self.limit = limit
        self.kwargs = kwargs
        
    def filter_(self, **kwargs):
        for key , value in kwargs.items():
            self.filters['{}'.format(key)] = value
        return self 
        
    def order_by(self, **kwargs):
        for key , value in kwargs.items():
            self.orderers['{}'.format(key)] = value
        return self 
        
    def build(self):
        params = {"q":self.q, "page":self.page}
        if self.limit:
            params["limit"] = self.limit
        if self.filters:
            for key, value in self.filters.items():
                params[f"filter[{key}]"] = value
        if self.orderers:
            for key , value in self.orderers.items():
                params[f"sort[{key}]"] = value
        return params


class TreffleAPIWrapper:
    def __init__(self, token):
        self.base_url = "https://trefle.io/api/v1"
        self.__token = token

    def _make_request(self, url, params):
        headers = {"Authorization": f"Bearer {self.__token}"}
        try:
            r = requests.get(url=url, params=params, headers=headers)
        except Exception as e:
            return {}
        else:
            if r.status_code == 200:
                return r.json()
            else:
                raise Exception(f"Request failed with status code {r.status_code}. Response content: {r.content}")
    
    class search_species(Query):
        def __init__(self, query, page = 1 , limit = 3 , **kwargs):
            super().__init__(query=query,page=page,limit=limit,kwargs=kwargs)

if __name__ == "__main__":
    api = TreffleAPIWrapper("fb7c8Funa_gZnYU5onH0Oj79uapv-vvUMZ9tDqU0JTo")
    url = "https://trefle.io/api/v1/species/search"
    req = api.search_species(query="Passion Flower").filter_(scientific_name = "Passiflora mixta").build()
    
    result = api._make_request(url=url,params=req)
    print(result)
