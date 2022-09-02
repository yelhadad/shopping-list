import json

import bcrypt, jwt, datetime
from flask import jsonify

def Merge(dict1, dict2):
    res = dict1 | dict2
    return res


def hash_password(password: str):
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt)


def compare_passwords(password, hashed_password):
    return bcrypt.checkpw(password, hashed_password)


def generate_jwt(payload: dict, key, minuets):
    jwt_payload = Merge(payload, {"exp": datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(minutes=minuets)})
    print(json.dumps(jwt_payload, indent=4, sort_keys=True, default=str))
    jwt_payload2 = [json.dumps(jwt_payload, indent=4, sort_keys=True, default=str),]
    return jwt.encode(
        {'data': jwt_payload2},
        key)


def decode_jwt(jwt_payload, key):
    return jwt.decode(jwt_payload, key, algorithms=["HS256"])







