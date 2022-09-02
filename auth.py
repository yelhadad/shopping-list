import bcrypt, jwt, datetime
from time import timezone


def hash_password(password: str):
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt)


def compare_passwords(password, hashed_password):
    return bcrypt.checkpw(password, hashed_password)


def generate_jwt(payload: dict, key, minuets):
    return jwt.encode(
        payload.update({"exp": datetime.datetime.now(tz=timezone.utc) + datetime.timedelta(minutes=minuets)}),
        key)


def decode_jwt(jwt_payload, key):
    return jwt.decode(jwt_payload, key, algorithms=["HS256"])