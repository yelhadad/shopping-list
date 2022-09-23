import sys

import bcrypt, time
from flask import Flask, request, make_response, jsonify
import psycopg

import auth
import db
from res import res
from auth import compare_passwords, hash_password, generate_jwt, decode_jwt
from bcrypt import checkpw
from auth_middleware import token_required

app = Flask(__name__)
JWT_EXPIRATION_TIME = 20
JWT_KEY = 'key'
time.sleep(2)
db.create_users_table()
db.create_shopping_table()


@app.post('/api/test')
@token_required
def test(user_id):
    print(user_id)
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
    # print(db.check_if_user_exists(email))
    fetched_user = db.get_user_by_email(email)
    fetched_password = fetched_user[2]
    fetched_id = fetched_user[0]
    if not (checkpw(password.encode('utf-8'), fetched_password.encode('utf-8'))):
        return make_response(jsonify({'err': 'password was not correct'}), 401)
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
@token_required
def current_user(user_id, email):
    return make_response({'email': email, 'id': user_id}, 200)


@app.get('/api/shopping/all')
@token_required
def get_shopping_list(user_id):
    items = db.get_shopping_list_by_user_id(user_id)


@app.post('/api/shopping/insert_one')
@token_required
def insert_one(user_id):
    requested_item = request.get_json()
    db.insert_one_shopping(requested_item)
    return make_response(jsonify({'message:': 'item add successfuly'}), 200)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


# Press the green button in the gutter to run the script.
if __name__ == "__main__":
    app.run('0.0.0.0', 5000, debug=True)

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
