import aiohttp
from bs4 import BeautifulSoup
from django.core.cache import cache


base_url = 'https://en.wikipedia.org/wiki/{}'
api_url = 'https://en.wikipedia.org/w/api.php'


class WikiInfoExtractor:
    def __init__(self):
        pass

    async def extract(self, to_extract="all", page_title=None):
        print("starting extract")
        data_out = None
        if to_extract == "description":
            data_out = await self.extract_text(page_title)
        elif to_extract == "image":
            data_out = await self.extract_image(page_title)
        elif to_extract == "infobox":
            data_out = await self.extract_infobox(page_title)
        elif to_extract in ["all", "*"]:
            data_out = await self.extract_all(page_title)
        return data_out

    @staticmethod
    async def extract_infobox(page_title):
        print("extracting infobox")
        url = base_url.format(page_title)
        print(url, " url ")
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
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
                if row.has_attr('style') and len(info_list) > 0:
                    break
        return info_list

    @staticmethod
    async def extract_text(title, split="== "):
        print("extracting description")
        url = api_url
        params = {
            'action': 'query',
            'prop': 'extracts',
            'titles': title,
            'format': 'json',
            'explaintext': '1',
        }

        async with aiohttp.ClientSession() as session:
            async with session.get(url, params=params) as response:
                data = await response.json()

        page_id = list(data['query']['pages'].keys())[0]
        page_info = data['query']['pages'][page_id]
        page_extract = page_info['extract']
        if split:
            splited = page_extract.split(split)[0].strip()
            return splited
        return page_extract

    @staticmethod
    async def extract_image(page_title, thumb_size=500):
        print("extracting image")
        url = api_url

        params = {
            'action': 'query',
            'prop': 'pageimages',
            'titles': page_title,
            'pithumbsize': thumb_size,
            'format': 'json'
        }

        async with aiohttp.ClientSession() as session:
            async with session.get(url, params=params) as response:
                data = await response.json()

        page_id = list(data['query']['pages'].keys())[0]
        page_info = data['query']['pages'][page_id]
        thumbnail_src = page_info['thumbnail']['source']

        return thumbnail_src

    @staticmethod
    async def extract_all(page_title, split="== ", thumb_size=500):
        print("extracting all")
        infobox_data = await WikiInfoExtractor.extract_infobox(page_title)
        page_text = await WikiInfoExtractor.extract_text(page_title, split)
        page_image = await WikiInfoExtractor.extract_image(page_title, thumb_size)

        all_data = {
            'infobox_data': infobox_data,
            'page_text': page_text,
            'page_image': page_image
        }

        return all_data
