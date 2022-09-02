from flask import Flask, request, make_response
import psycopg
import db

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
    db.check_if_user_exists(email)
    db.create_user(email, password)


    return 'dfgfnsdoigndgsion'

@app.post('/api/auth/signin')
def sign_in():
    return "<p>did'nt signuped yet</p>"

@app.post('/api/auth/signout')
def sign_out():
    return "<p>did'nt signuped yet</p>"

@app.get('/api/auth/currentuser')
def current_user():
    return "<p>did'nt signuped yet</p>"

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    print_hi('PyCharm')

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
