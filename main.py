import sys

import bcrypt, time
from flask import Flask, request, make_response, jsonify
import psycopg2

import auth
import db
from res import res
from auth import compare_passwords, hash_password, generate_jwt, decode_jwt

app = Flask(__name__)
JWT_EXPIRATION_TIME = 20

time.sleep(2)
db.create_users_table()

@app.post('/api/test')
def test():
    print(request.get_json())
    user = request.get_json()
    email = user['email']
    password: str = user['password']
    fetched_user = db.select_all_users()
    fetched_password = fetched_user[2]
    print(password)
    print(fetched_password)
    print(bcrypt.hashpw(password.encode('utf-8'), fetched_password) == fetched_password)
    return 'sdgfkosdnhgiodsghi'


@app.post('/api/auth/signup')
def sign_up():
    user = request.get_json()
    email = user['email']
    password = user['password']
    if db.check_if_user_exists(email):
        return res({"err": 'user already exists'}, 400)
    user = db.create_user(email, hash_password(password))
    payload = {'id': user[0], 'email': user[1]}
    jwt = generate_jwt(payload, 'key', JWT_EXPIRATION_TIME)
    response = make_response(jsonify({'message': 'user created'}), 201)
    response.set_cookie('jwt', jwt)
    return response


@app.post('/api/auth/signin')
def sign_in():
    user = request.get_json()
    email = user['email']
    password = user['password']
    print(db.check_if_user_exists(email))
    fetched_user = db.get_user_by_email(email)
    fetched_password = fetched_user[2]
    fetched_id = fetched_user[0]
    if not (auth.compare_passwords(password, fetched_password)):
        return res({'err: password was not correct', 401})
    else:
        payload = {'id': id, 'email': email}
        jwt = generate_jwt(payload, 'key', JWT_EXPIRATION_TIME)
        response = make_response(jsonify({'message': 'you are signed in!'}), 200)
        response.set_cookie('jwt', jwt)
        return response


@app.post('/api/auth/signout')
def sign_out():
    response = make_response(jsonify({'message': 'successfuly signed out!'}), 200)
    response.set_cookie('jwt', expires=0)
    return response

@app.get('/api/auth/currentuser')
def current_user():
    return "<p>didn't signuped yet</p>"

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    print_hi('PyCharm')

# See PyCharm help at https://www.jetbrains.com/help/pycharm/


