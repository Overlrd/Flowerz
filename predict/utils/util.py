import json

def generate_response_data(**kwargs):
    data = {}
    for key, value in kwargs.items():
        data[key] = value
    return json.dumps(data)