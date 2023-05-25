import json
from html.parser import HTMLParser

import aiohttp
import requests
from bs4 import BeautifulSoup
from django.core.cache import cache


class CustomHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = ""

    def handle_data(self, data: str):
        self.text += data

    def reset_parser(self):
        self.text = ""


CustomParser = CustomHTMLParser()


class WikimediaAPIWrapper:
    """Wraps a bunch of methods to perform requests to the wikimedia api
    """
    def __init__(self, client_id, client_secret, app_name, contact_infos):
        self.app_name = app_name
        self.contact_infos = contact_infos
        self.__client_id = client_id
        self.__client_secret = client_secret
        self.__base_url = "https://api.wikimedia.org/core/v1/wikipedia/"
        self._auth_url = (
            "https://meta.wikimedia.org/w/rest.php/"
            "oauth2/access_token")

    def _get_access_token(self):
        """Request an access token from wikimedia with client_id ,
          client_secret
        - cache the access token 
        - refresh it if expired 
        """
        access_token = cache.get("wikimedia_access_token")
        refresh_token = cache.get("wikimedia_refresh_token")

        if not access_token:
            params = {
                'grant_type': 'client_credentials',
                'client_id': self.__client_id,
                'client_secret': self.__client_secret,
            }

            auth_response = requests.post(auth=self._auth_url, data=params)
            auth_data = auth_response.json()

            access_token = auth_data["access_token"]
            expiration_timeout = auth_data["expiration"]
            refresh_token = auth_data.get("refresh_token", None)

            assert cache.add("wikimedia_access_token", access_token,
                             expiration_timeout)
            if refresh_token:
                cache.add("wikimedia_refresh_token", refresh_token)
        return access_token, refresh_token
    
    @staticmethod
    def _extract_from_search_result(search_result, to_extract: list,
                                    language_code="en"):
        """
        """
        data = json.loads(search_result.text)

        extracted_data = {}
        for page in data['pages']:
            for key in to_extract:
                if key == "thumbnail_url":
                    extracted_data["thumbnail_url"] = 'https:' + page['thumbnail']['url']
                elif key == "article_url":
                    extracted_data["article_url"] = f"https://{language_code}.wikipedia.org/wiki/{page['key']}"
                elif key == "excerpt":
                    parser = CustomHTMLParser()
                    parser.feed(page['excerpt'])
                    extracted_data['excerpt'] = parser.text
                else:
                    extracted_data[key] = page.get(key, None)
        return extracted_data

    def search_wikipedia(self, search_query, to_extract, language_code='en',
                         number_of_results=1):
        """ search a query in wikipedia pages \n
        return `number_of_results` item in the specified `language_code` \n
        `to_extract` a list of keys to extract from the article , values :\n
        - title (article's title)
        - description (article's short description)
        - article_url (article's url)
        - thumbnail_url (article's thumbnail if exists)
        - excerpt (articles's long description)
        """

        endpoint = '/search/page'
        url = self.__base_url + language_code + endpoint

        headers = {
            'Authorization': 'Bearer {}'.format(self._get_access_token()[0]),
            'User-Agent': '{0}({1})'.format(self.app_name, self.contact_infos)
        }
        params = {'q': search_query, 'limit': number_of_results}

        response = requests.get(url, headers=headers, params=params)
        return self._extract_from_search_result(response,
                                                to_extract=to_extract,
                                                language_code=language_code)


async def get_infobox_data(page_title):
    base_url = f'https://en.wikipedia.org/wiki/{page_title.replace(" ", "_")}'
    async with aiohttp.ClientSession() as session:
        async with session.get(base_url) as response:
            html = await response.text()

    soup = BeautifulSoup(html, 'html.parser')
    infobox = soup.find('table', class_='infobox biota')

    info_list = []
    if infobox:
        start_extract = False
        rows = infobox.find_all('tr')
        for row in rows:
            if start_extract:
                cells = row.find_all(['th', 'td'])
                if len(cells) >= 2:
                    label = cells[0].get_text().strip()
                    value = cells[1].get_text().strip()
                    info_list.append({'label': label, 'value': value})
            elif 'Scientific classification' in row.get_text():
                start_extract = True
            if row.has_attr('style'):
                break

    return info_list



async def get_page_text(title, split):
    base_url = 'https://en.wikipedia.org/w/api.php'
    params = {
        'action': 'query',
        'prop': 'extracts',
        'titles': title,
        'format': 'json',
        'explaintext': '1',
    }

    async with aiohttp.ClientSession() as session:
        async with session.get(base_url, params=params) as response:
            data = await response.json()

    page_id = list(data['query']['pages'].keys())[0]
    page_info = data['query']['pages'][page_id]
    page_extract = page_info['extract']
    if split:
        splited = page_extract.split(split)[0].strip()
        return splited
    return page_extract
 

async def get_page_image(page_title, thumb_size):
    base_url = 'https://en.wikipedia.org/w/api.php'

    params = {
        'action': 'query',
        'prop': 'pageimages',
        'titles': page_title,
        'pithumbsize': thumb_size,
        'format': 'json'
    }

    async with aiohttp.ClientSession() as session:
        async with session.get(base_url, params=params) as response:
            data = await response.json()

    page_id = list(data['query']['pages'].keys())[0]
    page_info = data['query']['pages'][page_id]
    thumbnail_src = page_info['thumbnail']['source']

    return thumbnail_src


async def get_all_data(page_title, split, thumb_size):
    infobox_data = await get_infobox_data(page_title)
    page_text = await get_page_text(page_title, split)
    page_image = await get_page_image(page_title, thumb_size)

    all_data = {
        'infobox_data': infobox_data,
        'page_text': page_text,
        'page_image': page_image
    }

    return all_data
