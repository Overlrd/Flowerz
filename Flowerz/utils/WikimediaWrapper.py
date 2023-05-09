import json

from django.core.cache import cache
import requests

class WikimediaAPIWrapper:
    """Wraps a bunch of methods to perform requests to the wikimedia api
    """
    def __init__(self, client_id , client_secret, app_name , contact_infos):
        self.app_name = app_name
        self.contact_infos = contact_infos
        self.__client_id = client_id
        self.__client_secret = client_secret
        self.__base_url = "https://api.wikimedia.org/core/v1/wikipedia/"
        self._auth_url = "https://meta.wikimedia.org/w/rest.php/oauth2/access_token"
    
    def _get_access_token(self):
        """Request an access token from wikimedia with client_id , client_secret
        - cache the access token 
        - refresh it if expired 
        """
        access_token = cache.get("wikimedia_access_token")
        refresh_token = cache.get("wikimedia_refresh_token")

        if not access_token :
            auth_params = {
                'grant_type': 'client_credentials',
                'client_id': self.__client_id,
                'client_secret': self.__client_secret,
            }

            auth_response = requests.post(auth=self._auth_url, data=auth_params)
            auth_data = auth_response.json()

            access_token = auth_data["access_token"]
            expiration_timeout = auth_data["expiration"]
            refresh_token = auth_data.get("refresh_token", None)

            assert cache.add("wikimedia_access_token",access_token,expiration_timeout)
            if refresh_token:
                cache.add("wikimedia_refresh_token",refresh_token)
        return access_token , refresh_token
    
    def _extract_from_search_result(self, search_result, to_extract: list, language_code):
        """
        """
        data = json.loads(search_result.text)

        extracted_data = {}
        for page in data['pages']:
            for key in to_extract:
                if key in page:
                    extracted_data[key] = page.get(key , f"{key}")
                if key == "thumbnail_url":
                    extracted_data["thumbnail_url"] = 'https:' + page['thumbnail']['url']
                if key == "article_url":
                    extracted_data["article_url"] = 'https://' + language_code + '.wikipedia.org/wiki/' + page['key']

        return extracted_data

    def search_wikipedia(self, search_query , to_extract , language_code = 'en', number_of_results = 1 ):
        """ search a query in wikipedia pages \n
        return `number_of_results` item in the specified `language_code` \n
        `to_extract` a list of keys to extract from the article , values :\n
        - title (article's title)
        - description (article's decription)
        - article_url (article's url)
        - thumbnail_url (article's thumbnail if exists)
	    """
        endpoint = '/search/page'
        url = self.__base_url + language_code + endpoint

        headers = {
            'Authorization': 'Bearer {}'.format(self._get_access_token()[0]),
            'User-Agent': '{0}({1})'.format(self.app_name, self.contact_infos)
        }
        params = {'q': search_query, 'limit': number_of_results}

        response = requests.get(url , headers= headers , params=params)
        return self._extract_from_search_result(response, to_extract=to_extract,language_code=language_code)
