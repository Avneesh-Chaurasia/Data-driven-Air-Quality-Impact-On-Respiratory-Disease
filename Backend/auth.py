from flask import Blueprint, request, jsonify
import sqlite3
from flask_bcrypt import Bcrypt
import jwt
import datetime
import os

auth = Blueprint('auth', __name__)
bcrypt = Bcrypt()

# 🔐 Use environment variable for security
SECRET_KEY = os.getenv("SECRET_KEY", "dev_secret")

# ✅ Absolute DB path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "users.db")


# ================== DB HELPER ==================
def get_db():
    return sqlite3.connect(DB_PATH)


def init_users_db():
    conn = get_db()
    c = conn.cursor()

    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')

    conn.commit()
    conn.close()


init_users_db()


# ================== SIGNUP ==================
@auth.route('/signup', methods=['POST'])
def signup():
    if not request.is_json:
        return jsonify({"error": "Invalid JSON"}), 400

    data = request.get_json()

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # ✅ Validation
    if not username or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    if "@" not in email:
        return jsonify({"error": "Invalid email format"}), 400

    # 🔐 Hash password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    conn = get_db()
    c = conn.cursor()

    try:
        c.execute(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            (username, email, hashed_password)
        )
        conn.commit()

        return jsonify({"message": "User created successfully"}), 201

    except sqlite3.IntegrityError:
        return jsonify({"error": "Email already registered"}), 400

    except Exception:
        return jsonify({"error": "Something went wrong"}), 500

    finally:
        conn.close()


# ================== LOGIN ==================
@auth.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"error": "Invalid JSON"}), 400

    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    conn = get_db()
    c = conn.cursor()

    user = c.execute(
        "SELECT * FROM users WHERE email = ?",
        (email,)
    ).fetchone()

    conn.close()

    if user and bcrypt.check_password_hash(user[3], password):

        token = jwt.encode({
            'user_id': user[0],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, SECRET_KEY, algorithm='HS256')

        # ✅ Fix for PyJWT returning bytes
        if isinstance(token, bytes):
            token = token.decode('utf-8')

        return jsonify({
            "message": "Login successful",
            "token": token
        })

    return jsonify({"error": "Invalid credentials"}), 401