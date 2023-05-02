import requests 



def get_token():
    TOKEN = "fb7c8Funa_gZnYU5onH0Oj79uapv-vvUMZ9tDqU0JTo"
    route = "https://trefle.io/api/auth/claim"
    payload = {'token':TOKEN, 'origin':'http://127.0.0.1'}
    r = requests.post(route, params= payload)
    r = r.json()
    return r['token']