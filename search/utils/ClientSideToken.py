import requests 
def get_token(token,origin = "http://127.0.0.1"):
    """Get client side token from the treffle api , input : token , origin , optional(client ip address)"""
    route = "https://trefle.io/api/auth/claim"
    payload = {'token':token, 'origin':origin}
    r = requests.post(route, params= payload)
    r = r.json()
    print(r)
    return r['token']