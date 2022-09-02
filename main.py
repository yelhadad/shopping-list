import sys

from flask import Flask, request, make_response, jsonify
import psycopg
import db
from res import res
from auth import compare_passwords, hash_password, generate_jwt, decode_jwt

app = Flask(__name__)


@app.post('/api/test')
def test():
    print(request.get_json())
    user = request.get_json()
    email = user['email']
    password = user['password']
    print(email)
    print(password)
    return 'sdgfkosdnhgiodsghi'


@app.post('/api/auth/signup')
def sign_up():
    user = request.get_json()
    email = user['email']
    password = user['password']
    db.create_users_table()
    if db.check_if_user_exists(email):
        return res({"err": 'user already exists'}, 400)
    user = db.create_user(email, hash_password(password))
    payload = {'id': user[0], 'email': user[1]}
    jwt = generate_jwt(payload, 'key', 20)
    response = make_response(jsonify({'message': 'user created'}), 201)
    response.set_cookie('jwt', jwt)
    return response


@app.post('/api/auth/signin')
def sign_in():
    return "<p>didn't signuped yet</p>"

@app.post('/api/auth/signout')
def sign_out():
    return "<p>didn't signuped yet</p>"

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
