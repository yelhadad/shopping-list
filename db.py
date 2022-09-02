# connect to postgres, the port is provided by default
# with keyword is for pretier syntax
import psycopg, sys
def get_db_connection():
    return psycopg.connect(
            dbname  ='shopping',
            host    ='postgres-srv',
            user    ='admin',
            password='mamram'
    )
# creates the users table, does nothing if the table exists
def create_users_table():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users(
            id serial PRIMARY KEY,
            email varchar (1000) NOT NULL,
            password varchar (1000) NOT NULL)
    """)
    conn.commit()
    cur.close()
    conn.close()


def create_user(email, password):
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""INSERT INTO users(email, password)
                            VALUES (%s, %s)""",
                        (email, password))
            conn.commit()
            cur.execute("SELECT * FROM users WHERE email=%s", (email,))
            user = cur.fetchone()
            return user[0], user[1]


def get_user_by_id(id):
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM users WHERE id=%s", (id,))
        return cur.fetchone()

def check_if_user_exists(email):
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM users WHERE email=%s", (email,))
            if cur.fetchone() == None:
                return False
            else:
                return True

def q_create_users_table():
    return """
        CREATE TABLE IF NOT EXISTS users(
            id serial PRIMARY KEY,
            email varchar (1000) NOT NULL,
            password varchar (1000) NOT NULL)
    """
def q_create_user(email, password):
    return ("""INSERT INTO users(email, password)
                            VALUES (%s, %s)""",
                        (email, password))

def q_get_user_by_id(email):
    return """SELECT id FROM users"""




