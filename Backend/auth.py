from flask import Blueprint, request, jsonify
from flask_cors import CORS
import sqlite3
from flask_bcrypt import Bcrypt
import jwt
import datetime
import os

auth = Blueprint('auth', __name__)
CORS(auth)
bcrypt = Bcrypt()

SECRET_KEY = os.getenv("SECRET_KEY", "dev_secret")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "users.db")


# ================== DB HELPER ==================
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_users_db():
    conn = get_db()
    c = conn.cursor()

    # ✅ Updated table with bio
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
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

    username = (data.get('username') or "").strip()
    email = (data.get('email') or "").strip().lower()
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    if "@" not in email:
        return jsonify({"error": "Invalid email format"}), 400

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
        return jsonify({"error": "Username or Email already exists"}), 400

    finally:
        conn.close()


# ================== LOGIN ==================
@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    identifier = (data.get('identifier') or "").strip().lower()
    password = data.get('password')

    conn = get_db()
    c = conn.cursor()

    user = c.execute(
        "SELECT * FROM users WHERE LOWER(email)=? OR LOWER(username)=?",
        (identifier, identifier)
    ).fetchone()

    conn.close()

    if not user:
        return jsonify({"error": "User not found"}), 404

    if not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"error": "Wrong password"}), 401

    token = jwt.encode({
        'user_id': user["id"],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, SECRET_KEY, algorithm='HS256')

    return jsonify({
        "message": "Login successful",
        "token": token,
        "username": user["username"],
        "email": user["email"] 
    })