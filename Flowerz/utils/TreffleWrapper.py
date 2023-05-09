import os
import requests
class Query:
    def __init__(self, route, query, page=1, limit=3, **kwargs):
        self.filters = {}
        self.orderers = {}
        self.q = query
        self.page = page
        self.limit = limit
        self.kwargs = kwargs
        self.base_url = "https://trefle.io/api/v1"
        self.route = route
        self.url = "{0}{1}".format(self.base_url, self.route)

    def filter_(self, **kwargs):
        for key, value in kwargs.items():
            self.filters['{}'.format(key)] = value
        return self

    def order_by(self, **kwargs):
        for key, value in kwargs.items():
            self.orderers['{}'.format(key)] = value
        return self

    def _build(self):
        params = {"page": self.page}
        if self.limit:
            params["limit"] = self.limit
        if self.q is not None:
            params["q"] = self.q
        if self.filters:
            for key, value in self.filters.items():
                params[f"filter[{key}]"] = value
        if self.orderers:
            for key, value in self.orderers.items():
                params[f"sort[{key}]"] = value
        return (self.url, params)



class TreffleAPIWrapper:
    """Wrapps the Treffle api , contains subclasses of query object for aech query"""
    def __init__(self, token):
        self.base_url = "https://trefle.io/api/v1"
        self.__token = token

    def make_request(self, query):
        """Make a get request to the Treffle API using the provided Query object"""
        url, params = query._build()
        print(params)
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
    
    class SearchSpeciesQuery(Query):
        """Retrieve data from '/species/search' route , return Query object"""
        def __init__(self, query, page = 1 , limit = 3 , **kwargs):
            route = "/species/search"
            super().__init__(route=route,query=query,page=page,limit=limit,kwargs=kwargs)

    class SearchPlantsQuery(Query):
        """Retrieve data from '/plants/search' route , return Query object"""
        def __init__(self, query, page = 1 , limit = 3 , **kwargs):
            route = "/plants/search"
            super().__init__(route=route,query=query,page=page,limit=limit,kwargs=kwargs)
    
    class GetItemQuery(Query):
        """Retrieve data from '/plants/' route , return Query object"""
        def __init__(self, query=None, page=1, limit=10, **kwargs):
            route = "/plants"
            super().__init__(route=route, query=query, page=page, limit=limit,kwargs=kwargs)

if __name__ == "__main__":
    api = TreffleAPIWrapper("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MzUsIm9yaWdpbiI6Imh0dHA6Ly8xMjcuMC4wLjEiLCJpcCI6bnVsbCwiZXhwaXJlIjoiMjAyMy0wNS0wOSAxNDozMDoyNSArMDAwMCIsImV4cCI6MTY4MzY0MjYyNX0.o-FJI28PW9VKWWFIrw9qp5CnOTP9eatQqtPcDAhb9gI")
    #req = api.SearchSpeciesQuery(query="Passion Flower",limit=3)
    req = api.GetItemQuery(query=None,limit=5)
    print(req)
    result = api.make_request(req)
    print(len(result['data']))
