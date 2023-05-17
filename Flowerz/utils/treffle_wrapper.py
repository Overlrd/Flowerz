import requests

TREFFLE_DATA_FIELDS = ['id', 'common_name', 'scientific_name', 'year', 'bibliography', 'author', 'family_common_name',
                       'image_url', 'synonyms', 'genus', 'family']


class Query:
    def __init__(self, route, query, page=1, limit=3, **kwargs):
        self.filters = {}
        self.orders = {}
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
            self.orders['{}'.format(key)] = value
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
        if self.orders:
            for key, value in self.orders.items():
                params[f"sort[{key}]"] = value
        return self.url, params


class TreffleAPIWrapper:
    """Wraps the Treffle api , contains subclasses of query object for each query"""

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
        except requests.RequestException:
            return {}
        else:
            if r.status_code == 200:
                return r.json()
            else:
                raise Exception(f"Request failed with status code {r.status_code}. Response content: {r.content}")

    class SearchSpeciesQuery(Query):
        """Retrieve data from '/species/search' route , return Query object"""

        def __init__(self, query, page=1, limit=3, **kwargs):
            route = "/species/search"
            super().__init__(route=route, query=query, page=page, limit=limit, kwargs=kwargs)

    class SearchPlantsQuery(Query):
        """Retrieve data from '/plants/search' route , return Query object"""

        def __init__(self, query, page=1, limit=3, **kwargs):
            route = "/plants/search"
            super().__init__(route=route, query=query, page=page, limit=limit, kwargs=kwargs)

    class GetItemQuery(Query):
        """Retrieve data from '/plants/' route , return Query object"""

        def __init__(self, query=None, page=1, limit=10, **kwargs):
            route = "/plants"
            super().__init__(route=route, query=query, page=page, limit=limit, kwargs=kwargs)

    @staticmethod
    def extract_data(data, to_extract):
        extracted = []
        for flower in data:
            extracted_flower = {}
            for key in to_extract:
                if key in flower:
                    extracted_flower[key] = flower[key]
            extracted.append(extracted_flower)
        return extracted


if __name__ == "__main__":
    api = TreffleAPIWrapper("")
    # req = api.SearchSpeciesQuery(query="Passion Flower",limit=3)
    req = api.GetItemQuery(query=None, limit=5)
    print(req)
    result = api.make_request(req)
    print(len(result['data']))
