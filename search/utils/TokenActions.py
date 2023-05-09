from datetime import datetime
import requests

def get_client_jwt(request, TOKEN ):
    expiration_time_str = request.session.get('token_expiration')
    current_time = datetime.now()

    if expiration_time_str:
        expiration_time = datetime.strptime(expiration_time_str, "%m-%d-%Y %H:%M")
        if current_time < expiration_time:
            # Token is still valid, return it
            return request.session['token']

    route = "https://trefle.io/api/auth/claim"
    payload = {'token': TOKEN, 'origin': 'http://127.0.0.1'}
    r = requests.post(route, params=payload)
    response = r.json()
    token = response['token']
    expiration_str = response['expiration']
    request.session['token'] = token
    request.session['token_expiration'] = expiration_str
    return token

