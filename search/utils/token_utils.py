from datetime import datetime
import requests


def check_token(request):
    expiration_time_str = request.session.get('token_expiration')
    current_time = datetime.now()

    if expiration_time_str:
        expiration_time = datetime.strptime(expiration_time_str, "%m-%d-%Y %H:%M")
        if current_time < expiration_time:
            # Token is still valid, return it
            return request.session['token']
        else:
            return False
    else:
        return False


def renew_client_side_token(TOKEN):
    route = "https://trefle.io/api/auth/claim"
    payload = {'token': TOKEN, 'origin': 'http://127.0.0.1'}
    r = requests.post(route, params=payload)
    response = r.json()
    token = response['token']
    expiration_str = response['expiration']
    return token, expiration_str
